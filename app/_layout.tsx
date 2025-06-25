import React from "react";
import "./global.css";
import { Provider } from "react-redux";
import store from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./home";
import DetailScreen from "./todo/[id]";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ThemeProvider from "./provider/themeProvider";

// create an object type with mappings for route names to the params of the route
type RootStackParamList = {
  Home: undefined;
  Detail: { title: string };
};

// After we have defined the mapping, we need to tell our navigator to use it.
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </ThemeProvider>
    </Provider>
  );
}

// Define screen prop include route and navigation to use in screen
// The type takes 3 generics:

// The param list object we defined earlier (here is RootStackParamList)
// The name of the route the screen belongs to (defined as 'Detail')
// The ID of the navigator (optional)
export type DetailScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "Detail"
>;
