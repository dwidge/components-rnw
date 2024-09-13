// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { StyledPicker } from "./StyledPicker.js";
import { StyledText } from "./StyledText.js";
import { StyledView } from "./StyledView.js";

export const PickerHint = <T,>({
  label,
  items,
  value: [value, setValue],
}: {
  label: string;
  items: { label: string; value: T; help?: string }[];
  value: [T | null, (v: T | null) => void];
}) => (
  <StyledView gap>
    <StyledText colorLabel>{label}</StyledText>
    <StyledPicker
      value={value}
      onChange={(v) => setValue(v(value))}
      options={items}
    />
    <StyledText colorHint center>
      {items.find((v) => v.value === value)?.help}
    </StyledText>
  </StyledView>
);
