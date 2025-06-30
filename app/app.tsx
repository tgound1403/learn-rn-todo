import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./_layout";
import React from "react";

export default function App() {
  return (
    <NavigationContainer initialState={{ routes: [{ name: "Login" }] }}>
        <AppStack />
    </NavigationContainer>
  );
}
