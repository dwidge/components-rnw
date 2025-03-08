import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { withTheme } from "@rneui/themed";
import { useMemo } from "react";
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { StyledView } from "./StyledView";

const iconComponents = [FontAwesome, Ionicons, Feather];

const getIconComponent = (iconName: string) => {
  for (const i of iconComponents) {
    if (iconName in i.glyphMap) {
      return i;
    }
  }
  return iconComponents[0];
};

type FeatherGlyphNames = keyof typeof Feather.glyphMap;
type FontAwesomeGlyphNames = keyof typeof FontAwesome.glyphMap;
type IoniconsGlyphNames = keyof typeof Ionicons.glyphMap;

export type IconButtonNames =
  | FeatherGlyphNames
  | FontAwesomeGlyphNames
  | IoniconsGlyphNames;

export type IconButtonProps = {
  name?: IconButtonNames;
  onPress?: () => unknown | Promise<unknown>;
  size?: number;
  color?: ColorValue;
  disabledColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export const IconButton = withTheme(
  ({
    name,
    onPress,
    size = 20,
    color,
    disabledColor,
    style,
    ...props
  }: IconButtonProps) => {
    const IconComponent = useMemo(
      () => getIconComponent(name as string),
      [name],
    );

    return (
      <TouchableOpacity onPress={onPress}>
        <StyledView
          center
          middle
          style={[
            {
              width: size,
              height: size,
            },
            style,
          ]}
        >
          <IconComponent
            name={name as any}
            size={size}
            color={onPress ? color : disabledColor}
            style={{
              padding: 15,
              margin: -15,
              backgroundColor: "transparent",
              opacity: onPress ? 1 : 0.2,
            }}
            {...props}
          />
        </StyledView>
      </TouchableOpacity>
    );
  },
  "IconButton",
);
