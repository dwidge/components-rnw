// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { View, ViewStyle, ViewProps } from "react-native";
import { FlagKeysFromRecordKeys } from "@dwidge/utils-js";

export type UnstyledViewProps<Styles extends ViewStyleSheet = { default: {} }> =
  {
    stylesheet?: Styles;
  } & ViewProps &
    // Omit<ViewStyle, keyof Styles> &
    FlagKeysFromRecordKeys<Styles>;

type ViewStyleSheet = Record<string & "default", ViewStyle>;

export const UnstyledView = <Styles extends ViewStyleSheet>({
  children,
  style,
  stylesheet,
  ...props
}: UnstyledViewProps<Styles>) =>
  children && (
    <View
      style={[
        stylesheet?.default,
        ...Object.entries(stylesheet ?? {})
          .filter(([k, v]) => props[k as keyof typeof props])
          .map(([k, v]) => v),
        style,
      ]}
      {...Object.fromEntries(
        Object.entries(props).filter(
          ([k, v]) => !Object.keys(stylesheet ?? {}).includes(k)
        )
      )}
    >
      {children}
    </View>
  );
