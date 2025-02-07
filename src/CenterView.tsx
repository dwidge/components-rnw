// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { GestureResponderEvent, Pressable } from "react-native";
import { StyledView, StyledViewProps } from "./StyledView.js";

export const CenterView = ({
  children,
  onPressInside = (e) => {
    e.stopPropagation();
  },
  ...props
}: StyledViewProps & {
  onPressInside?: (e: GestureResponderEvent) => void;
}) => (
  <StyledView flex middle center {...props}>
    <Pressable onPress={onPressInside}>{children}</Pressable>
  </StyledView>
);
