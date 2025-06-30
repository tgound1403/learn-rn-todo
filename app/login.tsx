import { Text, View } from "react-native";
import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { configureGoogleSignin } from "@/service/googleSignin";
import { useGoogleSignInStore } from "@/store/googleSignInStore";
import AntDesign from "@expo/vector-icons/AntDesign";

import React = require("react");
import { LoginScreenProp } from "./_layout";

const LoginScreen = ({ route, navigation }: LoginScreenProp) => {
  const { isSignedIn, signIn, user } = useGoogleSignInStore();

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  useLayoutEffect(() => {
    if (isSignedIn && user) {
      navigation.navigate("Home");
    } else {
      console.log("User is not signed in");
    }
  }, [isSignedIn, user, navigation]);

  return (
    <SafeAreaView>
      <View className="flex h-screen items-center justify-center flex-col gap-4">
        {!(isSignedIn && user) ? (
          <View className="flex flex-row border-black border-2 rounded-full p-4 justify-center items-center gap-4">
            <Text
              className="text-black font-light text-lg"
              onPress={() => signIn()}
            >
              Sign In with Google
            </Text>
            <AntDesign name="google" size={32} color="black" />
          </View>
        ) : (
          <Text onPress={() => navigation.navigate("Home")}>Lets go</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
