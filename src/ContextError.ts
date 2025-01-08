// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export class ContextError extends Error {
  context: any;
  constructor(message: string, options: { cause?: any; context?: any }) {
    super(message, options);
    this.context = options.context;
  }
}

export const logContextError = (e: unknown) => {
  if (e instanceof Error) {
    console.log(
      "logContextError1",
      e.message,
      e instanceof ContextError ? e.context : e,
    );
    if (e.cause) logContextError(e.cause);
  } else {
    console.log("logContextError2", e);
  }
};
