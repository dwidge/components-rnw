import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";

// ... (rest of the imports)

interface LogEntry {
  level: "log" | "warn" | "error";
  data: any[];
  timestamp: Date;
}

interface ConsoleContextProps {
  children: React.ReactNode;
}

interface ConsoleContextValue {
  logHistory: LogEntry[];
  clearLogHistory: () => void;
}

const ConsoleContext = createContext<ConsoleContextValue | undefined>(
  undefined,
);

const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

export const ConsoleProvider: React.FC<ConsoleContextProps> = ({
  children,
}) => {
  const [logHistory, setLogHistory] = useState<LogEntry[]>([]);
  const isCapturingRef = useRef(false);

  const clearLogHistory = useCallback(() => {
    setLogHistory([]);
  }, []);

  const captureLog = useCallback(
    (level: "log" | "warn" | "error", args: any[]) => {
      setLogHistory((prev) => [
        ...prev,
        { level, data: args, timestamp: new Date() },
      ]);
    },
    [],
  );

  const enableCapture = useCallback(() => {
    if (isCapturingRef.current) return;
    isCapturingRef.current = true;

    console.log = (...args: any[]) => {
      captureLog("log", args);
      originalConsoleLog(...args);
    };

    console.warn = (...args: any[]) => {
      captureLog("warn", args);
      originalConsoleWarn(...args);
    };

    console.error = (...args: any[]) => {
      captureLog("error", args);
      originalConsoleError(...args);
    };
  }, [captureLog]);

  const disableCapture = useCallback(() => {
    if (!isCapturingRef.current) return;
    isCapturingRef.current = false;
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  }, []);

  useEffect(() => {
    enableCapture();
    return () => {
      disableCapture();
    };
  }, [enableCapture, disableCapture]);

  const value: ConsoleContextValue = {
    logHistory,
    clearLogHistory,
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
