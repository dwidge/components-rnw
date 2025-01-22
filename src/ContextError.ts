// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export class ContextError extends Error {
  context: any;

  constructor(message: string, options: { cause?: any; context?: any } = {}) {
    super(message, options);
    this.name = "ContextError";
    this.context = options.context;
  }

  private indent = (str: string, indent: number): string => {
    const indentation = " ".repeat(indent);
    return str
      .split("\n")
      .map((line) => `${indentation}${line}`)
      .join("\n");
  };

  override toString(): string {
    let result = `${this.name}: ${this.message}`;

    if (this.context) {
      const contextString = JSON.stringify(this.context, null, 2);
      result += `\n  Context:\n${this.indent(contextString, 4)}`;
    }

    if (this.cause) {
      const causeString =
        this.cause instanceof Error
          ? this.cause.toString()
          : String(this.cause);
      result += `\n  Cause:\n${this.indent(causeString, 4)}`;
    }

    return result;
  }
}
