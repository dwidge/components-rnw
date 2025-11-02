// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Toasts } from "@backpackapp-io/react-native-toast";
import { withTheme } from "@rneui/themed";
import React from "react";
import { ColorValue, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoid } from "./KeyboardAvoid.js";
import { StyledView, StyledViewProps } from "./StyledView.js";

export type ScreenViewProps = {
  backgroundColor?: ColorValue;
} & StyledViewProps;

export const ScreenView = withTheme(
  ({ children, backgroundColor, ...props }: ScreenViewProps) => (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoid>
        <StyledView flex column {...props}>
          {children}
        </StyledView>
        <View style={{ position: "absolute" }}>
          <Toasts preventScreenReaderFromHiding />
        </View>
      </KeyboardAvoid>
    </SafeAreaView>
  ),
  "ScreenView",
) as React.FC<ScreenViewProps>;
