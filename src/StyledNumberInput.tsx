// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  useAsync,
  useAsyncSaveState,
  useAsyncState,
} from "@dwidge/hooks-react";
import { Input } from "@rneui/themed";
import { StyleProp, TextStyle } from "react-native";
import { StyledText } from "./StyledText";
import { StyledView } from "./StyledView";

export const StyledTextInput = ({
  value: [value, setValue] = useAsyncState<string | null>(null),
  label = undefined as string | undefined,
  placeholder = undefined as string | undefined,
  getError = (e: Error) => e.message,
  debounceMs = 1000,
  numberOfLines = 1,
  style = undefined as StyleProp<TextStyle> | undefined,
  secureTextEntry = false,
}) => {
  const [setValueTry, busy, error] = useAsync(setValue);
  const [cache, setCache, changed, save] = useAsyncSaveState(
    [value, setValueTry],
    true,
    debounceMs,
  );

  return (
    <StyledView flex>
      <Input
        label={label}
        renderErrorMessage={false}
        value={cache ?? ""}
        onChangeText={setCache ? (s) => setCache(s || null) : undefined}
        onBlur={save}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={numberOfLines > 1}
        style={[
          { padding: 10, width: "100%", textAlignVertical: "top" },
          style,
        ]}
        secureTextEntry={secureTextEntry}
      ></Input>
      {error && <StyledText>{getError(error)}</StyledText>}
    </StyledView>
  );
};

export const StyledNumberInput = ({
  value: [value, setValue] = useAsyncState<number | null>(null),
  label = undefined as string | undefined,
  placeholder = undefined as string | undefined,
  getError = (e: Error) => e.message,
  debounceMs = 1000,
  style = undefined as StyleProp<TextStyle> | undefined,
}) => {
  const [setValueTry, busy, error] = useAsync(setValue);
  const [cache, setCacheRaw, changed, save] = useAsyncSaveState(
    [value, setValueTry],
    true,
    debounceMs,
  );

  // Need to parse string to number and handle empty string as null
  const setCache = setCacheRaw
    ? (s: string | null) => {
        setCacheRaw(s === null || s === "" ? null : +s);
      }
    : undefined;

  return (
    <StyledView flex>
      <Input
        label={label}
        renderErrorMessage={false}
        value={cache !== null && cache !== undefined ? "" + cache : ""}
        onChangeText={setCache ? (s) => setCache(s) : undefined}
        onBlur={save}
        placeholder={placeholder}
        style={[{ padding: 10, width: "100%" }, style]}
      ></Input>
      {error && <StyledText>{getError(error)}</StyledText>}
    </StyledView>
  );
};
