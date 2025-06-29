import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./_layout";

export default function App() {
  return (
    <NavigationContainer initialState={{ routes: [{ name: "Login" }] }}>
        <AppStack />
    </NavigationContainer>
  );
}
