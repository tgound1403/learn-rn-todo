import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext({toggleTheme: () => {},isDarkMode: false});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === "dark");
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider
