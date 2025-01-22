import { createContext, useContext } from "react";
import { toast, ToastOptions } from "@backpackapp-io/react-native-toast";

type ToastType = "info" | "success" | "error";

type ToastTypes = Record<ToastType, ToastOptions>;

const defaultToastTypes: ToastTypes = {
  info: {
    styles: {
      text: { color: "black" },
      view: { backgroundColor: "white" },
    },
  },
  success: {
    styles: {
      text: { color: "white" },
      view: { backgroundColor: "green" },
    },
  },
  error: {
    styles: {
      text: { color: "white" },
      view: { backgroundColor: "red" },
    },
  },
};

export const ToastOptionsContext = createContext<ToastTypes>(defaultToastTypes);

export const useToastOptions = (toastType: ToastType): ToastOptions => {
  const toastTypes = useContext(ToastOptionsContext);
  return toastTypes[toastType] || toastTypes.info;
};

export const toastInfo = (message: string, options = defaultToastTypes.info) =>
  toast(message, options);

export const toastSuccess = (
  message: string,
  options = defaultToastTypes.success,
) => toast(message, options);

export const toastError = (
  message: string,
  options = defaultToastTypes.error,
) => toast(message, options);
