import React, { useEffect, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const { history, clear } = useConsoleContext();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Delay scrollToEnd slightly to allow layout to settle on web
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  }, [history]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={clear}>
        <Text style={styles.clearButtonText}>Clear Logs</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={history}
        renderItem={({ item }) => <LogItem entry={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
