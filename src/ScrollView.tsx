// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ScrollView as RNScrollView } from "react-native";
import { StyledView, StyledViewProps } from "./StyledView.js";

export const ScrollView = ({
  children,
  horizontal,
  ...props
}: StyledViewProps & { horizontal?: boolean }) => (
  <RNScrollView
    horizontal={horizontal}
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
