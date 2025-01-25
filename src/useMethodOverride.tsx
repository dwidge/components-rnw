import { useRef, useEffect } from "react";

export function useMethodOverride<
  T extends Record<string, (...args: any[]) => any>,
>(target: T, source: Partial<T>) {
  const originalMethods = useRef<Partial<T>>({});

  useEffect(() => {
    const methodsToOverride = Object.keys(source) as (keyof T)[];

    methodsToOverride.forEach((methodName) => {
      if (
        typeof target[methodName] === "function" &&
        typeof source[methodName] === "function"
      ) {
        originalMethods.current[methodName] = target[methodName];
        target[methodName] = source[methodName] as T[typeof methodName];
      }
    });

    return () => {
      Object.keys(originalMethods.current).forEach((methodName) => {
        if (originalMethods.current[methodName] !== undefined) {
          target[methodName as keyof T] = originalMethods.current[
            methodName
          ] as T[keyof T];
          delete originalMethods.current[methodName];
        }
      });
    };
  }, [target, source]);
}
