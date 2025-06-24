import React from "react";
import "./global.css";
import { Provider } from "react-redux";
import store from "./store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  HomeScreen  from "./home";
import DetailScreen from "./todo/[id]";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: { title: string };
};

export type DetailScreenProp = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Provider store={store}>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="Detail" component={DetailScreen} options={{headerShown: false}} />
      </RootStack.Navigator>
    </Provider>
  );
}
