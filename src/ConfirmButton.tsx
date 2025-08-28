import { sleep } from "@dwidge/utils-js";
import { ButtonProps, useTheme } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { IoniconsGlyph } from "./IconName.js";
import { StyledButton } from "./StyledButton.js";

export type ConfirmButtonProps = Omit<
  ButtonProps,
  "onPress" | "icon" | "buttonStyle"
> & {
  onPress?: () => unknown;
  onError?: (e: unknown) => unknown;
  icon?: IoniconsGlyph;
  disabledColor?: string;
  iconColor?: string;
  confirmColor?: string;
  confirmTimeout?: number; // Optional timeout in milliseconds, default 3000ms
  confirm?: boolean;
};

export const ConfirmButton = ({
  onPress,
  onError,
  icon,
  disabledColor,
  iconColor,
  confirmColor = "red",
  confirmTimeout = 3000,
  confirm = true,
  ...props
}: ConfirmButtonProps) => {
  const [confirmed, setConfirmed] = useState(false);
  const theme = useTheme().theme;
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (confirmed && confirmTimeout > 0) {
      timeoutId.current = setTimeout(() => {
        setConfirmed(false);
      }, confirmTimeout);
    }
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [confirmed, confirmTimeout]);

  const handleConfirmPress = onPress
    ? async () => {
        await sleep(0);
        if (!confirm) await onPress();
        else {
          if (!confirmed) {
            setConfirmed(true);
            if (timeoutId.current) {
              clearTimeout(timeoutId.current); // Clear any existing timeout if re-confirmed quickly
            }
          } else {
            await onPress();
            setConfirmed(false); // Reset after action is performed
          }
        }
      }
    : undefined;

  const buttonStyle =
    confirmed && confirmColor ? { backgroundColor: confirmColor } : undefined;
  const title = confirmed ? props.title : props.title;

  return (
    <StyledButton
      onPress={onPress ? handleConfirmPress : undefined}
      onError={onError}
      icon={icon}
      disabledColor={disabledColor}
      iconColor={iconColor}
      {...props}
      buttonStyle={[props.style, buttonStyle]}
      title={title}
    />
  );
};
