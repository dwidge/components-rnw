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
    color: "#999",
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
    alignItems: "center",
  },
  logLineData: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  expandableItemContainer: {
    marginLeft: 15,
    marginTop: 0,
    marginBottom: 0,
  },
  expandableItem: {
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#555",
  },
  details: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#8882",
    width: "100%",
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
  summaryTouchable: {
    flex: 1,
    flexDirection: "row", // Ensure items are in a row
    justifyContent: "space-between", // Keep timestamp on the right
    alignItems: "center", // Vertically align items
  },
  bracket: {
    color: "#999",
    fontFamily: "monospace",
    fontSize: 12,
  },
  stringSummary: {
    color: "#0f0",
  },
});

const truncateString = (str: string, maxLength: number): string => {
  if (str.includes("\n")) {
    const firstLine = str.split("\n")[0];
    const truncated =
      firstLine.length > maxLength
        ? firstLine.substring(0, maxLength) + "..."
        : firstLine + "...";
    return truncated;
  } else if (str.length > maxLength) {
    const truncated = str.substring(0, maxLength) + "...";
    return truncated;
  }
  return str;
};

const RenderSummaryItem: React.FC<{ item: any }> = ({ item }) => {
  if (typeof item === "object" && item !== null) {
    const isArray = Array.isArray(item);
    return (
      <Text style={styles.bracket}>
        {isArray ? "[" : "{"}
        {Object.keys(item).length > 0 ? "..." : ""}
        {isArray ? "]" : "}"}
      </Text>
    );
  } else if (typeof item === "string") {
    return <Text style={styles.stringSummary}>{truncateString(item, 50)}</Text>;
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

const RenderDetailsItem: React.FC<{ item: any }> = ({ item }) => {
  if (typeof item === "object" && item !== null) {
    const isArray = Array.isArray(item);
    const keys = isArray ? item : Object.keys(item);
    const hasKeys = Object.keys(item).length > 0;

    return (
      <View key={`details-${Math.random()}`}>
        <Text style={styles.bracket}>{isArray ? "[" : "{"}</Text>
        {hasKeys && (
          <View style={styles.expandableItemContainer}>
            <ScrollView horizontal={true} style={styles.horizontalScrollView}>
              <View style={styles.expandableItem}>
                {keys.map((key, index) => (
                  <View
                    style={styles.logLine}
                    key={`${isArray ? "index" : "key"}-${index}`}
                  >
                    <Text
                      style={isArray ? styles.arrayIndex : styles.objectKey}
                    >
                      {isArray ? index : key}
                    </Text>
                    <Text>: </Text>
                    <RenderDetailsItem
                      item={isArray ? item[index] : item[key]}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
        <Text style={styles.bracket}>{isArray ? "]" : "}"}</Text>
      </View>
    );
  } else if (typeof item === "string") {
    // Details show full string
    return <Text style={styles.string}>{JSON.stringify(item)}</Text>;
  } else {
    return <RenderSummaryItem item={item} />;
  }
};

export const LogItem: React.FC<LogItemProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <View style={styles.logItemContainer}>
      <View style={styles.logLineMain}>
        <TouchableOpacity
          style={styles.summaryTouchable}
          onPress={toggleExpand}
        >
          <View style={styles.logLineData}>
            <Text style={[styles.logPrefix, styles[entry.level]]}>
              {entry.level.toUpperCase()}:
            </Text>
            {entry.data.map((item, index) => (
              <React.Fragment key={index}>
                <RenderSummaryItem item={item} />
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
      {isExpanded && (
        <View style={styles.details}>
          {entry.data.map((item, index) => (
            <RenderDetailsItem key={`expanded-item-${index}`} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};