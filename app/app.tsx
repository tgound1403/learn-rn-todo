import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./_layout";

const React = require("react");

export default function App() {
  return (
    <NavigationContainer initialState={{ routes: [{ name: "Login" }] }}>
        <AppStack />
    </NavigationContainer>
  );
}
