// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { StyledView } from "./StyledView.js";
import React from "react";
import { ScrollView as RNScrollView } from "react-native";
import { StyledViewProps } from "./StyledView.js";

export const ScrollView = ({ children, ...props }: StyledViewProps) => (
  <RNScrollView
    // keyboardShouldPersistTaps="always"
    contentContainerStyle={{
      flexGrow: 1,
    }}
  >
    <StyledView {...props} style={[{ flex: 1 }, props.style]}>
      {children}
    </StyledView>
  </RNScrollView>
);
