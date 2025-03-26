import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { withTheme } from "@rneui/themed";
import { PropsWithChildren, useMemo } from "react";
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
} & PropsWithChildren;

export const IconButton = withTheme(
  ({
    name,
    onPress,
    size = 20,
    color,
    disabledColor,
    style,
    children,
    ...props
  }: IconButtonProps) => {
    const IconComponent = useMemo(
      () => getIconComponent(name as string),
      [name],
    );

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <StyledView
          flex
          center
          middle
          row
          sgap
          style={[{ padding: 10, margin: -10, opacity: onPress ? 1 : 0.2 }]}
        >
          <IconComponent
            name={name as any}
            size={size}
            color={onPress ? color : disabledColor}
            style={{
              width: size,
              height: size,
              backgroundColor: "transparent",
            }}
            {...props}
          />
          {children}
        </StyledView>
      </TouchableOpacity>
    );
  },
  "IconButton",
);
