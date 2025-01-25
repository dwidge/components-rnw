import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useMethodOverrideWithChain } from "./useMethodOverrideWithChain";

interface LogEntry {
  level: "log" | "warn" | "error" | "assert";
  data: any[];
  timestamp: Date;
}

interface ConsoleObject extends Record<string, any> {
  log: (...data: any[]) => void;
  warn: (...data: any[]) => void;
  error: (...data: any[]) => void;
  assert: (condition: boolean, ...data: any[]) => void;
}

interface ConsoleContextValue extends ConsoleObject {
  history: LogEntry[];
  clear: () => void;
}

interface ConsoleContextProps {
  children: React.ReactNode;
}

const ConsoleContext = createContext<ConsoleContextValue | undefined>(
  undefined,
);

const serializeData = (data: any[]) =>
  data.map((item) =>
    item instanceof Error
      ? {
          message: item.message,
          name: item.name,
          stack: item.stack,
        }
      : item,
  );

export const ConsoleProvider: React.FC<ConsoleContextProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<LogEntry[]>([]);

  const clear = useCallback(() => {
    setHistory([]);
  }, []);

  const addLogEntry = useCallback(
    (level: LogEntry["level"], data: any[]) => {
      Promise.resolve().then(() => {
        setHistory((prev) => [
          ...prev,
          { level, data: serializeData(data), timestamp: new Date() },
        ]);
      });
    },
    [setHistory],
  );

  const log = useCallback(
    (...data: any[]) => {
      addLogEntry("log", data);
    },
    [addLogEntry],
  );

  const warn = useCallback(
    (...data: any[]) => {
      addLogEntry("warn", data);
    },
    [addLogEntry],
  );

  const error = useCallback(
    (...data: any[]) => {
      addLogEntry("error", data);
    },
    [addLogEntry],
  );

  const assert = useCallback(
    (condition: boolean, ...data: any[]) => {
      if (!condition) {
        addLogEntry("assert", data);
      }
    },
    [addLogEntry],
  );

  const value: ConsoleContextValue = {
    history,
    clear,
    log,
    warn,
    error,
    assert,
  };

  return (
    <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>
  );
};

export const useConsoleContext = () => {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error("useConsoleContext must be used within a ConsoleProvider");
  }
  return context;
};

interface OverrideConsoleProviderProps extends ConsoleContextProps {}

const OverrideConsoleInner: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { log, warn, error, assert } = useConsoleContext();

  useMethodOverrideWithChain(console as ConsoleObject, {
    log,
    warn,
    error,
    assert,
  });

  return <>{children}</>;
};

export const OverrideConsoleProvider: React.FC<
  OverrideConsoleProviderProps
> = ({ children }) => {
  return (
    <ConsoleProvider>
      <OverrideConsoleInner>{children}</OverrideConsoleInner>
    </ConsoleProvider>
  );
};