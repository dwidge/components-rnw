// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { View, Text } from "react-native";
import { useColorScheme } from "./useColorScheme.js";

export function ColorScheme(): JSX.Element | null {
  const c = useColorScheme();
  console.log("ColorScheme1", c);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: c === "dark" ? "#000" : "#fff",
      }}
    >
      <Text style={{ color: "red" }}>Current color scheme: {c}</Text>
    </View>
  );
}
