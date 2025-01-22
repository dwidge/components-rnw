import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useConsoleContext } from "./ConsoleContext";
import { LogItem } from "./ConsoleLogItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export const ConsoleScreen: React.FC = () => {
  const { logHistory, clearLogHistory } = useConsoleContext();
  const flatListRef = useRef<FlatList>(null);
  const [isCloseToBottom, setIsCloseToBottom] = useState(true);

  const handleScroll = useCallback(
    ({
      nativeEvent,
    }: {
      nativeEvent: {
        contentOffset: { y: number };
        contentSize: { height: number };
        layoutMeasurement: { height: number };
      };
    }) => {
      const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
      const bottomOffset = contentSize.height - layoutMeasurement.height;
      setIsCloseToBottom(contentOffset.y >= bottomOffset - 20); // Adjust threshold as needed
    },
    [],
  );

  useEffect(() => {
    if (logHistory.length > 0 && isCloseToBottom) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [logHistory, isCloseToBottom]);

  useEffect(() => {
    // Scroll to bottom on mount
    if (logHistory.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: false });
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={clearLogHistory}>
        <Text style={styles.clearButtonText}>Clear Logs</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={logHistory}
        renderItem={({ item }) => <LogItem entry={item} />} // Use the LogItem component
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        onContentSizeChange={() => {
          // This ensures scroll to bottom if new content pushes the view out of bottom
          if (isCloseToBottom && logHistory.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
        }}
      />
    </View>
  );
};
