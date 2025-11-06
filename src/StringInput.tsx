// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import {
  AsyncState,
  useAsyncState,
  useOptimisticState,
} from "@dwidge/hooks-react";
import { Input, InputProps } from "@rneui/themed";
import { StyleProp, TextStyle } from "react-native";

export const StringInput = ({
  value: [value, setValue] = useAsyncState<string>(""),
  label = undefined as string | undefined,
  placeholder = undefined as string | undefined,
  numberOfLines = 1,
  style = undefined as StyleProp<TextStyle> | undefined,
  secureTextEntry = false,
  ...props
}: Omit<InputProps, "value"> & { value: AsyncState<string> }) => {
  const [optimisticValue, setOptimisticValue] = useOptimisticState(
    [value, setValue],
    "",
  );

  return (
    <Input
      {...props}
      label={label}
      renderErrorMessage={false}
      value={optimisticValue}
      onChangeText={setOptimisticValue}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      multiline={numberOfLines > 1}
      style={{ padding: 10, width: "100%", textAlignVertical: "top" }}
      containerStyle={style}
      secureTextEntry={secureTextEntry}
    ></Input>
  );
};
