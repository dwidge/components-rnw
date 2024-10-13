// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { ColorValue, View } from "react-native";
import { StyledView, StyledViewProps } from "./StyledView.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { withTheme } from "@rneui/themed";

export type ScreenViewProps = {
  backgroundColor?: ColorValue;
} & StyledViewProps;

export const ScreenView = withTheme(
  ({ children, backgroundColor, ...props }: ScreenViewProps) => (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ zIndex: 1 }}>
        <Toasts />
      </View>
      <StyledView flex column {...props}>
        {children}
      </StyledView>
    </SafeAreaView>
  ),
  "ScreenView"
) as React.FC<ScreenViewProps>;
