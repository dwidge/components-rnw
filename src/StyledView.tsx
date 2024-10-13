// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { StyleSheet } from "react-native";
import { UnstyledViewProps, UnstyledView } from "./UnstyledView.js";
import { withTheme } from "@rneui/themed";

export const viewStyles = StyleSheet.create({
  default: {},
  flex: { flex: 1 },
  flex3: { flex: 3 },
  wrap: { flexWrap: "wrap" },
  overflowHidden: { overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center" },
  column: { flexDirection: "column" },
  left: { alignItems: "flex-start" },
  center: { alignItems: "center" },
  right: { alignItems: "flex-end" },
  start: { justifyContent: "flex-start" },
  middle: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  space: { justifyContent: "space-between" },
  bgRed: { backgroundColor: "red" },
  bgYellow: { backgroundColor: "yellow" },
  outlineRed: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "red",
  },
  gap: { gap: 20 },
  sgap: { gap: 10 },
  pad: { padding: 20 },
  hpad: { paddingHorizontal: 20, paddingVertical: 10 },
  nhmargin: { marginHorizontal: -20 },
  spad: { padding: 10 },
  outline: { borderWidth: 1 },
  minWidth: { minWidth: 150, width: "100%" },
  narrow: { maxWidth: 300, width: "100%" },
  wide: { maxWidth: 600, width: "100%" },
  selfcenter: { alignSelf: "center" },
  hidden: { height: 0 },
  mediumSquare: { width: 120, height: 120 },
  card: {
    flex: 1,
    padding: 10,
    gap: 10,
    borderWidth: 0.5,
    borderRadius: 8 * 1,
    borderColor: "grey",
  },
});

export type StyledViewProps = UnstyledViewProps<typeof viewStyles>;

export const StyledView = withTheme(
  (props: Omit<StyledViewProps, "stylesheet">) => (
    <UnstyledView stylesheet={viewStyles} {...props} />
  ),
  "StyledView"
) as React.FC<Omit<StyledViewProps, "stylesheet">>;
