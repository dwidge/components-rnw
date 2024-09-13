// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const StyledOverlay = ({
  children,
  actions,
}: {
  children: ReactNode;
  actions?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => unknown;
  }[];
}) => (
  <View style={{ position: "relative" }}>
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        gap: 5,
        padding: 10,
      }}
    >
      {actions?.map((action, i) => (
        <TouchableOpacity
          key={i}
          onPress={action.onPress}
          style={{
            opacity: 0.5,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Ionicons
            name={action.icon}
            size={24}
            color="black"
            style={{ padding: 0 }}
          />
        </TouchableOpacity>
      ))}
    </View>
    {children}
  </View>
);
