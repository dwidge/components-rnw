// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Ionicons } from "@expo/vector-icons";
import { useTheme, withTheme } from "@rneui/themed";
import React from "react";
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: ColorValue;
  disabledColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export const IconButton = withTheme(
  ({ icon, onPress, color, disabledColor, style }: IconButtonProps) => (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons
        name={icon}
        size={24}
        color={onPress ? color : disabledColor}
        style={{ padding: 10 }}
      />
    </TouchableOpacity>
  ),
  "IconButton",
) as React.FC<IconButtonProps>;

export const StyledIcon = ({
  theme = useTheme(),
  icon,
  ...props
}: IconButtonProps & {
  theme?: ReturnType<typeof useTheme>;
}): JSX.Element | null => (
  <Ionicons
    name={icon}
    size={24}
    color={theme.theme.colors.primary}
    style={{ paddingHorizontal: 10 }}
    {...props}
  />
);
