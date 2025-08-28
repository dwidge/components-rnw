import { useAsync } from "@dwidge/hooks-react";
import { sleep } from "@dwidge/utils-js";
import { Button, ButtonProps, useTheme } from "@rneui/themed";
import { useContext } from "react";
import { EventErrorHandlerContext } from "./EventErrorHandler.js";
import { IoniconsGlyph } from "./IconName.js";
import { StyledIcon } from "./StyledIcon.js";

export type StyledButtonProps = Omit<ButtonProps, "onPress" | "icon"> & {
  onPress?: () => unknown;
  onError?: (e: unknown) => unknown;
  icon?: IoniconsGlyph;
  disabledColor?: string;
  iconColor?: string;
};

export const StyledButton = ({
  onPress,
  onError = useContext(EventErrorHandlerContext),
  loading = undefined,
  disabled = !onPress,
  icon,
  disabledColor = useTheme()?.theme?.colors.greyOutline,
  iconColor = disabled ? disabledColor : "white",
  ...props
}: StyledButtonProps) => {
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

  return (
    <Button
      loading={loading || loading2}
      icon={icon && <StyledIcon icon={icon} color={iconColor} />}
      onPress={onPressLoader}
      disabled={disabled}
      {...props}
    />
  );
};
