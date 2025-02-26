import React from "react";
import { UnstyledTextProps, UnstyledText } from "./UnstyledText.js";
import { StyleSheet } from "react-native";
import { withTheme } from "@rneui/themed";

export const textStyles = StyleSheet.create({
  default: {
    fontFamily: "sans",
  },
  primary: {
    color: "black",
    fontSize: 16,
  },
  black: {
    color: "black",
  },
  gray: { color: "gray" },
  white: {
    color: "white",
  },
  link: { color: "blue" },
  error: { color: "red" },
  l: {
    fontSize: 30,
  },
  m: {
    fontSize: 24,
  },
  s: {
    fontSize: 16,
  },
  xs: {
    fontSize: 14,
  },
  xxs: {
    fontSize: 12,
  },
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  xbold: {
    fontWeight: "bold",
    fontFamily: "sans",
  },
  underline: { textDecorationStyle: "solid" },
  pad: { padding: 14 },
  rounded: {
    borderRadius: 8,
    overflow: "hidden",
  },
  xrounded: {
    borderRadius: 12,
    overflow: "hidden",
  },
  chip: {
    padding: 5,
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 8,
    overflow: "hidden",
  },
  uppercase: { textTransform: "uppercase" },
  tab: {
    marginLeft: 10,
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  flex: { flex: 1 },
  outline: { borderColor: "grey", borderWidth: 1 },
  highlight: { color: "white", backgroundColor: "grey" },
  redBg: { backgroundColor: "red" },
  greenBg: { backgroundColor: "green" },
  orangeBg: { backgroundColor: "orange" },
  colorTab: { color: "black" },
  colorLabel: { color: "blue" },
  colorHint: { color: "green" },
});

export type StyledTextProps = UnstyledTextProps<typeof textStyles>;

export const StyledText = withTheme(
  (props: Omit<StyledTextProps, "stylesheet">) => (
    <UnstyledText stylesheet={textStyles} {...props} />
  ),
  "StyledText",
) as React.FC<Omit<StyledTextProps, "stylesheet">>;
