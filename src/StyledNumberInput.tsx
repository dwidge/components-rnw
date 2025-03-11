// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  useAsync,
  useAsyncSaveState,
  useAsyncState,
  useConvert,
} from "@dwidge/hooks-react";
import { assert } from "@dwidge/utils-js";
import { Input } from "@rneui/themed";
import { useEffect, useState } from "react";
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
  // Todo: fix cache causing cursor to jump to end, so we dont need localValue
  const [localValue, setLocalValue] = useState<string | null>(cache ?? null);

  useEffect(() => {
    setLocalValue(cache ?? null);
  }, [cache]);

  return (
    <StyledView flex sgap>
      <Input
        label={label}
        renderErrorMessage={false}
        value={localValue ?? ""}
        onChangeText={(text) => {
          const next = text.trim() || null;
          setLocalValue(next);
          if (setCache) {
            setCache(next);
          }
        }}
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
      {error && <StyledText error>{getError(error)}</StyledText>}
    </StyledView>
  );
};

const useStringOfNumber = useConvert<number | null, string | null>(
  (t) => (t === null ? "" : "" + t),
  (r, prev) => (assert(!isNaN(Number(r)), "Not a number"), Number(r)),
);

export const StyledNumberInput = ({
  value: [value, setValue] = useAsyncState<number | null>(null),
  ...props
}) => (
  <StyledTextInput value={useStringOfNumber([value, setValue])} {...props} />
);
