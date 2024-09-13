// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Colors, Theme, useTheme } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";

export const StyledPicker = <T,>({
  value,
  onChange,
  options,
  theme = useTheme().theme,
}: {
  value: T;
  onChange?: (v: (prev: T) => T) => unknown;
  options?: { label: string; value: T }[];
  theme?: {
    colors: Colors;
  } & Theme;
}) => (
  <Picker
    selectedValue={value}
    onValueChange={(v) => onChange?.(() => v)}
    style={{
      fontSize: 16,
      color: theme.colors.black,
      backgroundColor: theme.colors.white,
    }}
  >
    {value == undefined || value === "" ? (
      <Picker.Item label="None" value={undefined} />
    ) : null}
    {options?.map((option, index) => (
      <Picker.Item key={index} label={option.label} value={option.value} />
    ))}
  </Picker>
);
