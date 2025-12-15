import { assert } from "@dwidge/utils-js";

export const toString = (v: any): string => (
  assert(typeof v === "string", "toStringE1: " + typeof v),
  v
);
