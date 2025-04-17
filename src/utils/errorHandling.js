// src/utils/errorHandling.js

export const setupErrorHandling = () => {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      /Warning:/.test(args[0]) ||
      /ResizeObserver loop completed with undelivered notifications/.test(args[0])
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (/Warning:/.test(args[0])) {
      return;
    }
    originalConsoleWarn(...args);
  };
};