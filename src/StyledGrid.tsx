// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { Gap } from "./Gap.js";

export const StyledGrid = ({
  pad,
  gap,
  children,
}: PropsWithChildren<{ pad?: boolean; gap?: boolean }>) => (
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: gap ? 10 : undefined,
      padding: pad ? 10 : undefined,
    }}
  >
    {children}
    <Gap narrow hidden />
    <Gap narrow hidden />
    <Gap narrow hidden />
    <Gap narrow hidden />
    <Gap narrow hidden />
    <Gap narrow hidden />
  </ScrollView>
);
