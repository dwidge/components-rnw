// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Button, ButtonProps, useTheme } from "@rneui/themed";
import { StyledIcon } from "./IconButton.js";
import { Ionicons } from "@expo/vector-icons";
import { useAsync } from "@dwidge/hooks-react";
import { notifyError } from "./notify.js";

export const StyledButton = ({
  onPress,
  loading = undefined,
  loader: [onPressLoader, loading2, error] = useAsync(
    onPress ? async () => onPress() : undefined,
  ),
  disabled = !onPressLoader,
  icon,
  iconColor = disabled ? useTheme().theme.colors.greyOutline : "white",
  ...props
}: Omit<ButtonProps, "onPress" | "icon"> & {
  onPress?: () => unknown;
  icon?: keyof typeof Ionicons.glyphMap;
  loader?: [
    f: ((...args: any[]) => Promise<any>) | undefined,
    busy: boolean,
    error: Error | undefined,
  ];
  iconColor?: string;
}) => (
  <Button
    loading={loading || loading2}
    icon={icon && <StyledIcon icon={icon} color={iconColor} />}
    onPress={() => onPressLoader?.().catch((e) => notifyError(e))}
    disabled={disabled}
    {...props}
  />
);
