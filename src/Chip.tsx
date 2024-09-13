// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { StyledText } from "./StyledText.js";

export interface ChipProps {
  text?: string;
  color?: string;
}

export const Chip = ({ text, color }: ChipProps) =>
  text && (
    <StyledText
      style={{
        backgroundColor: color,
      }}
      chip
    >
      {text}
    </StyledText>
  );
