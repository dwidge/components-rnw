// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useAsync } from "@dwidge/hooks-react";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonProps, useTheme } from "@rneui/themed";
import { useContext } from "react";
import { EventErrorHandlerContext } from "./EventErrorHandler.js";
import { StyledIcon } from "./IconButton.js";

export const StyledButton = ({
  onPress,
  onError = useContext(EventErrorHandlerContext),
  loading = undefined,
  loader: [onPressLoader, loading2, error] = useAsync(
    onPress
      ? async () => {
          try {
            return await onPress();
          } catch (e) {
            onError(e);
          }
        }
      : undefined,
  ),
  disabled = !onPressLoader,
  icon,
  disabledColor = useTheme().theme.colors.greyOutline,
  iconColor = disabled ? disabledColor : "white",
  ...props
}: Omit<ButtonProps, "onPress" | "icon"> & {
  onPress?: () => unknown;
  onError?: (e: unknown) => unknown;
  icon?: keyof typeof Ionicons.glyphMap;
  loader?: [
    f: ((...args: any[]) => Promise<any>) | undefined,
    busy: boolean,
    error: Error | null,
  ];
  disabledColor?: string;
  iconColor?: string;
}) => (
  <Button
    loading={loading || loading2}
    icon={icon && <StyledIcon icon={icon} color={iconColor} />}
    onPress={onPressLoader}
    disabled={disabled}
    {...props}
  />
);
