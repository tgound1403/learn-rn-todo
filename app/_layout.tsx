import { Stack } from "expo-router";
import './global.css'

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="home" options={{headerShown: false}} />
    <Stack.Screen name="todo/[id]" options={{headerShown: false}} />
  </Stack>;
}
