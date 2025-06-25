import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./_layout";
import ThemeProvider from "./provider/themeProvider";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AppStack />
      </ThemeProvider>
    </NavigationContainer>
  );
}
