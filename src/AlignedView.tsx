// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { ReactNode } from "react";
import { StyledView } from "./StyledView.js";
import { ViewStyle } from "react-native";
import { Gap } from "./Gap.js";

export const AlignedView = ({
  left,
  center,
  right,
  style,
}: {
  left?: ReactNode | false;
  center?: ReactNode | false;
  right?: ReactNode | false;
  style?: ViewStyle;
}) => (
  <StyledView row center style={style}>
    <StyledView flex start>
      {left || <Gap />}
    </StyledView>
    <StyledView middle>{center || <Gap />}</StyledView>
    <StyledView
      flex
      end
      row
      style={{
        flexWrap: "wrap",
      }}
    >
      {right || <Gap />}
    </StyledView>
  </StyledView>
);
