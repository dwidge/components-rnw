// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Picker } from "@react-native-picker/picker";
import { Colors, Theme, useTheme } from "@rneui/themed";
import { StyleProp, TextStyle } from "react-native";
import { StyledLoader } from "./StyledLoader";
import { AsyncState } from "@dwidge/hooks-react";
import { SetStateAction } from "react";

export const StyledStringPicker = <T extends string | number | boolean>({
  value: [value, onChange],
  options,
  theme = useTheme().theme,
  style,
  unknownLabel,
}: {
  value: AsyncState<T>;
  options?: { label: string; value: T }[];
  theme?: {
    colors: Colors;
  } & Theme;
  style?: StyleProp<TextStyle>;
  unknownLabel?: string;
}) => {
  if (value === undefined) {
    return <StyledLoader />;
  }

  let valueMatchesOption = false;
  if (options) {
    for (const option of options) {
      if (option.value === value) {
        valueMatchesOption = true;
        break;
      }
    }
  }

  if (!valueMatchesOption && unknownLabel === undefined) {
    throw new Error(
      "StyledStringPickerE1: value does not match any option and unknownLabel is not provided.",
      { cause: { value, options } },
    );
  }

  return (
    <Picker
      selectedValue={value}
      onValueChange={onChange ? (v) => onChange(() => v) : undefined}
      style={[
        {
          color: theme.colors.black,
          backgroundColor: theme.colors.white,
        },
        style,
      ]}
    >
      {unknownLabel && !valueMatchesOption && (
        <Picker.Item label={unknownLabel} value={value} />
      )}
      {options?.map((option, index) => (
        <Picker.Item key={index} label={option.label} value={option.value} />
      ))}
    </Picker>
  );
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JsonValue }
  | JsonValue[];

export const StyledJsonPicker = <JsonValueType extends JsonValue>({
  value: [value, onChange],
  options,
  theme = useTheme().theme,
  style,
  unknownLabel,
}: {
  value: AsyncState<JsonValueType>;
  options?: { label: string; value: JsonValueType }[];
  theme?: {
    colors: Colors;
  } & Theme;
  style?: StyleProp<TextStyle>;
  unknownLabel?: string;
}) => {
  const stringifiedValue =
    value === undefined ? undefined : JSON.stringify(value);

  const stringifiedOptions = options?.map((option) => ({
    ...option,
    value: JSON.stringify(option.value),
    label: option.label,
  }));

  const stringifiedOnChange =
    value !== undefined && onChange
      ? async (getV: SetStateAction<string>) => {
          const prevStringifiedV = stringifiedValue;
          const newStringifiedV =
            typeof getV === "function" ? getV(prevStringifiedV!) : getV;
          const parsedNewV: JsonValueType = JSON.parse(
            newStringifiedV as string,
          );
          onChange((prev) => parsedNewV);
          return newStringifiedV;
        }
      : undefined;

  return (
    <StyledStringPicker<string>
      value={[stringifiedValue, stringifiedOnChange]}
      options={stringifiedOptions}
      theme={theme}
      style={style}
      unknownLabel={unknownLabel}
    />
  );
};

export const StyledPicker = StyledJsonPicker;
