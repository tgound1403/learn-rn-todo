import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/_layout";

export default function App() {
  return (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
  );
}
