// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// https://stackoverflow.com/a/72554509

import { Alert as RNAlert, AlertButton, Platform } from "react-native";

const alertPolyfill = (
  title: string,
  message?: string | undefined,
  buttons?: AlertButton[] | undefined
) => {
  const result = window.confirm([title, message].filter(Boolean).join("\n"));

  if (result) {
    const confirmOption = buttons?.find(({ style }) => style !== "cancel");
    confirmOption && confirmOption.onPress?.();
  } else {
    const cancelOption = buttons?.find(({ style }) => style === "cancel");
    cancelOption && cancelOption.onPress?.();
  }
};

const alert = Platform.OS === "web" ? alertPolyfill : RNAlert.alert;
const confirm = (title: string, message?: string | undefined) =>
  new Promise((res) =>
    alert(
      title,
      message,
      [
        {
          text: "OK",
          style: "default",
          onPress: () => res(true),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => res(false),
        },
      ],
      { cancelable: true }
    )
  );

export const Alert = { alert, confirm };
export default Alert;
