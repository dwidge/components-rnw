import { ButtonProps } from "@rneui/themed";
import { StyledButton } from "./StyledButton";
import { Linking } from "react-native";

export type StyledLinkProps = {
  title?: string | null | undefined;
  url?: string | null | undefined;
} & Omit<ButtonProps, "onPress" | "icon" | "title">;

export const StyledLink: React.FC<StyledLinkProps> = ({
  title,
  url = title,
  ...props
}) => (
  <StyledButton
    title={title ?? undefined}
    onPress={url ? async () => Linking.openURL(url) : undefined}
    {...props}
  />
);
