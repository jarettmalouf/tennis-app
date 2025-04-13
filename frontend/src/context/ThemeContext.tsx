import React, { createContext, useContext, useEffect, useState } from "react";

import { useColorScheme } from "react-native";

type Theme = {
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    border: string;
    notification: string;
    error: string;
  };
};

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: "#FFFFFF",
    text: "#1a1a1a",
    primary: "#1a1a1a",
    secondary: "#666666",
    card: "#f5f5f5",
    border: "#f0f0f0",
    notification: "#81b0ff",
    error: "#ff3b30",
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: "#1a1a1a",
    text: "#FFFFFF",
    primary: "#FFFFFF",
    secondary: "#CCCCCC",
    card: "#2c2c2c",
    border: "#3d3d3d",
    notification: "#81b0ff",
    error: "#ff453a",
  },
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    setIsDark(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
