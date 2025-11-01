import { useAsync } from "@dwidge/hooks-react";
import { sleep } from "@dwidge/utils-js";
import { withTheme } from "@rneui/themed";
import { PropsWithChildren, useContext, useMemo } from "react";
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { EventErrorHandlerContext } from "./EventErrorHandler";
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
    const onError = useContext(EventErrorHandlerContext);

    const [onPressLoader, loading2] = useAsync(
      onPress
        ? async () => {
            await sleep(0);
            try {
              return await onPress();
            } catch (e) {
              onError(e);
            }
          }
        : undefined,
    );

    const IconComponent = useMemo(
      () => getIconComponent(name as string),
      [name],
    );

    return (
      <TouchableOpacity onPress={onPressLoader} style={style}>
        <StyledView
          flex
          center
          middle
          row
          sgap
          style={[
            { padding: 10, margin: -10, opacity: onPressLoader ? 1 : 0.2 },
          ]}
        >
          <IconComponent
            name={name as any}
            size={size}
            color={onPressLoader ? color : disabledColor}
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
