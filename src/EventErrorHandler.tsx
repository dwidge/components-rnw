import { createContext } from "react";

const onErrorDefault = (e: unknown): unknown => {
  throw e;
};

export const EventErrorHandlerContext = createContext(onErrorDefault);
