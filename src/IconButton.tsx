// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Ionicons } from "@expo/vector-icons";
import { ColorValue } from "react-native";
import { useTheme, withTheme } from "@rneui/themed";

export type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: ColorValue;
  disabledColor?: ColorValue;
};

export const IconButton = withTheme(
  ({ icon, onPress, color, disabledColor }: IconButtonProps) => (
    <Ionicons
      name={icon}
      size={24}
      color={onPress ? color : disabledColor}
      style={{ padding: 10 }}
      onPress={onPress}
    />
  ),
  "IconButton"
);

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
