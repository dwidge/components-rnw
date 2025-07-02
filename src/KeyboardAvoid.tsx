import React, { createContext, useContext } from "react";
import { KeyboardAvoidingView, Platform, StyleProp } from "react-native";

type KeyboardAvoidSettings = {
  behavior?: "height" | "position" | "padding";
  keyboardVerticalOffset?: number;
  style?: StyleProp<any>;
};

const KeyboardAvoidContext = createContext<KeyboardAvoidSettings>({
  behavior: Platform.OS === "ios" ? "padding" : "height",
  keyboardVerticalOffset: 80,
  style: { flex: 1 },
});

export const useKeyboardAvoidSettings = () => useContext(KeyboardAvoidContext);

export const KeyboardAvoidProvider: React.FC<
  React.PropsWithChildren<KeyboardAvoidSettings>
> = ({ children, ...settings }) => (
  <KeyboardAvoidContext.Provider
    value={{ ...useKeyboardAvoidSettings(), ...settings }}
  >
    {children}
  </KeyboardAvoidContext.Provider>
);

export const KeyboardAvoid: React.FC<
  React.PropsWithChildren<KeyboardAvoidSettings>
> = ({ children, ...override }) => {
  const ctx = useKeyboardAvoidSettings();
  const settings = { ...ctx, ...override };
  return <KeyboardAvoidingView {...settings}>{children}</KeyboardAvoidingView>;
};
