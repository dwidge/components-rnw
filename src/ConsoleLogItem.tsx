import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface LogItemProps {
  entry: {
    level: "log" | "warn" | "error";
    data: any[];
    timestamp: Date;
  };
}

const styles = StyleSheet.create({
  logItemContainer: {
    marginBottom: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  logPrefix: {
    fontFamily: "monospace",
    fontSize: 12,
    marginRight: 5,
  },
  logText: {
    fontFamily: "monospace",
    fontSize: 12,
    flexShrink: 1,
  },
  logLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  logLineMain: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  logLineData: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  expandableItemContainer: {
    marginLeft: 15,
    marginTop: 2,
  },
  expandableItem: {
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#555",
  },
  objectKey: {
    color: "#ddd",
  },
  arrayIndex: {
    color: "#ddd",
  },
  string: {
    color: "#0f0",
  },
  number: {
    color: "#0ff",
  },
  boolean: {
    color: "#f0f",
  },
  null: {
    color: "#aaa",
  },
  undefined: {
    color: "#aaa",
  },
  function: {
    color: "#ffa",
  },
  error: {
    color: "#f00",
  },
  warn: {
    color: "#fa0",
  },
  log: {
    color: "#fff",
  },
  timestamp: {
    color: "#777",
    fontSize: 10,
  },
  horizontalScrollView: {
    flexGrow: 0,
  },
});

const RenderItem = ({
  item,
  depth = 0,
  isExpanded,
}: {
  item: any;
  depth?: number;
  isExpanded: boolean;
}) => {
  const marginLeft = depth > 0 ? 15 * depth : 0;

  if (typeof item === "object" && item !== null) {
    const isArray = Array.isArray(item);
    const keys = isArray ? item : Object.keys(item);

    return (
      <View style={{ marginLeft }} key={`object-${depth}-${Math.random()}`}>
        <Text>
          {isArray ? "[" : "{"}
          {Object.keys(item).length > 0 ? "..." : isArray ? "]" : "}"}
        </Text>
        {isExpanded && Object.keys(item).length > 0 && (
          <View style={styles.expandableItemContainer}>
            <ScrollView horizontal={true} style={styles.horizontalScrollView}>
              <View style={styles.expandableItem}>
                {keys.map((key, index) => (
                  <View
                    style={styles.logLine}
                    key={`${isArray ? "index" : "key"}-${depth}-${index}`}
                  >
                    <Text
                      style={isArray ? styles.arrayIndex : styles.objectKey}
                    >
                      {isArray ? index : key}
                    </Text>
                    <Text>: </Text>
                    <RenderItem
                      item={isArray ? item[index] : item[key]}
                      depth={depth + 1}
                      isExpanded={isExpanded}
                    />
                  </View>
                ))}
                {Object.keys(item).length === 0 && isArray && (
                  <Text>{"]"}</Text>
                )}
                {Object.keys(item).length === 0 && !isArray && (
                  <Text>{"}"}</Text>
                )}
              </View>
            </ScrollView>
          </View>
        )}
        {isExpanded && Object.keys(item).length === 0 && isArray && (
          <Text>{"]"}</Text>
        )}
        {isExpanded && Object.keys(item).length === 0 && !isArray && (
          <Text>{"}"}</Text>
        )}
      </View>
    );
  } else if (typeof item === "string") {
    return <Text style={styles.string}>{JSON.stringify(item)}</Text>;
  } else if (typeof item === "number") {
    return <Text style={styles.number}>{item}</Text>;
  } else if (typeof item === "boolean") {
    return <Text style={styles.boolean}>{String(item)}</Text>;
  } else if (item === null) {
    return <Text style={styles.null}>null</Text>;
  } else if (item === undefined) {
    return <Text style={styles.undefined}>undefined</Text>;
  } else if (typeof item === "function") {
    return <Text style={styles.function}>[Function]</Text>;
  } else if (item instanceof Error) {
    return <Text style={styles.error}>{String(item)}</Text>;
  } else {
    return <Text style={styles.logText}>{String(item)}</Text>;
  }
};

export const LogItem: React.FC<LogItemProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <View style={styles.logItemContainer}>
      <TouchableOpacity style={styles.logLineMain} onPress={toggleExpand}>
        <View style={styles.logLineData}>
          <Text style={[styles.logPrefix, styles[entry.level]]}>
            {entry.level.toUpperCase()}:
          </Text>
          {entry.data.map((item, index) => (
            <React.Fragment key={index}>
              <RenderItem item={item} depth={0} isExpanded={isExpanded} />
              {index < entry.data.length - 1 && (
                <Text style={styles.logText}> </Text>
              )}
            </React.Fragment>
          ))}
        </View>
        <Text style={styles.timestamp}>
          {entry.timestamp.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
