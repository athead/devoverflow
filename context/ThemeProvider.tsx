"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");

  const handleThemeChange = useCallback(() => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  }, [mode]);

  useEffect(() => {
    handleThemeChange();
  }, [mode, handleThemeChange]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export { ThemeProvider, useTheme };
