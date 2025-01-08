// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { toast } from "@backpackapp-io/react-native-toast";
import { friendlyErrorMessage } from "./userErrorMessage.js";
import { logContextError } from "./ContextError.js";

export const defaultTheme = {
  success: "green",
  error: "red",
  text: "black",
  textInvert: "white",
};

export const notifyInfo = (message: string, theme = defaultTheme) => {
  toast(message, { styles: { text: {} } });
};

export const notifySuccess = (message: string, theme = defaultTheme) => {
  toast(message, {
    styles: {
      text: { color: theme.textInvert },
      view: { backgroundColor: theme.success },
    },
  });
};

export const notifyError = (message: Error | string, theme = defaultTheme) => {
  logContextError(message);
  toast(friendlyErrorMessage(message), {
    styles: {
      text: { color: theme.textInvert },
      view: { backgroundColor: theme.error },
    },
  });
};
