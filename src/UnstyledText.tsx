// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Text, TextProps } from "@rneui/themed";
type TextStyle = TextProps["style"];

export type UnstyledTextProps<Styles extends TextStyleSheet = { default: {} }> =
  {
    stylesheet?: Styles;
  } & TextProps &
    // Omit<TextStyle, keyof Styles> &
    FlagKeysFromRecordKeys<Styles>;

type TextStyleSheet = Record<string & "default", TextStyle>;

type FlagKeysFromRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

export const UnstyledText = <Styles extends TextStyleSheet>({
  children,
  style,
  stylesheet,
  numberOfLines = 8,
  ...props
}: UnstyledTextProps<Styles>): React.JSX.Element | null =>
  children ? (
    <Text
      numberOfLines={numberOfLines}
      style={[
        stylesheet?.default,
        ...Object.entries(stylesheet ?? {})
          .filter(([k, v]) => props[k as keyof typeof props])
          .map(([k, v]) => v),
        style,
      ]}
      {...Object.fromEntries(
        Object.entries(props).filter(
          ([k, v]) => !Object.keys(stylesheet ?? {}).includes(k),
        ),
      )}
      // {...props} // crashes android, filter out tags first
    >
      {children}
    </Text>
  ) : null;
