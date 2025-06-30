import { Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { configureGoogleSignin } from "@/service/googleSignin";
import { useGoogleSignInStore } from "@/store/googleSignInStore";
import AntDesign from "@expo/vector-icons/AntDesign";

import { LoginScreenProp } from "./_layout";
import { useNavigation } from "expo-router";

const LoginScreen = () => {
  const { isSignedIn, signIn, user } = useGoogleSignInStore();
  const navigation = useNavigation<LoginScreenProp["navigation"]>();

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
          <View className="flex flex-row border-black border-2 rounded-full py-4 px-5 justify-center items-center gap-3">
            <Text
              className="text-black font-light text-lg"
              onPress={() => signIn()}
            >
              Sign In with Google
            </Text>
            <AntDesign name="google" size={32} color="black" />
          </View>
        ) : (
          <View className="flex flex-col items-start justify-between">
            <Text className="text-black text-left font-bold text-2xl">
              Welcome back,
            </Text>
            <Text className="text-black font-bold text-2xl">
              {user.user.name}
            </Text>
            <View className="flex flex-row border-black border-2 rounded-full p-4 justify-center items-center gap-4 mt-8">
              <Text onPress={() => navigation.navigate("Home")}>Lets go</Text>
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
