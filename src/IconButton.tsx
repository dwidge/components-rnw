import { withTheme } from "@rneui/themed";
import { PropsWithChildren, useMemo } from "react";
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { getIconComponent, IconGlyph } from "./IconName";
import { StyledView } from "./StyledView";

export type IconButtonProps = {
  name?: IconGlyph;
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
