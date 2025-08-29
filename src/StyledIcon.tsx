import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import { IoniconsGlyph } from "./IconName";

export type StyledIconProps = {
  icon: IoniconsGlyph;
  onPress?: () => void;
  size?: number;
  color?: ColorValue;
  disabledColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export const StyledIcon = ({
  theme = useTheme(),
  icon,
  ...props
}: StyledIconProps & {
  icon: IoniconsGlyph;
  theme?: ReturnType<typeof useTheme>;
}): React.JSX.Element | null => (
  <Ionicons
    name={icon}
    size={24}
    color={theme.theme.colors.primary}
    style={{ paddingHorizontal: 10 }}
    {...props}
  />
);
