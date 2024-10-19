"use client";
import { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export function AccessibilityProvider({ children }) {
  const [isAccessibilityMode, setAccessibilityMode] = useState(false);

  const toggleAccessibilityMode = () => {
    setAccessibilityMode((prevMode) => !prevMode);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isAccessibilityMode,
        setAccessibilityMode,
        toggleAccessibilityMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
