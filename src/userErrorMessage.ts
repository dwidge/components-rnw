// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const userErrorMessage = (v: string | Error) =>
  v instanceof Error ? friendlyErrorMessage(v) : v;

const friendlyErrorMessage = (e: Error) =>
  e.message === "Network Error"
    ? "Could not connect to server"
    : "Something went wrong";
