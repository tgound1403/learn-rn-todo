import React from 'react';
import { Stack } from "expo-router";
import './global.css'
import { Provider } from 'react-redux';
import { store } from './store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="home" options={{headerShown: false}} />
        <Stack.Screen name="todo/[id]" options={{headerShown: false}} />
      </Stack>
    </Provider>
  );
}
