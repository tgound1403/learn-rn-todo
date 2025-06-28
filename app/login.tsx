import { Text, View } from "react-native";
import React, { useState } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [state, setState] = useState({});

  GoogleSignin.configure();

  const hasPreviousSignIn = async () => {
    const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
    setState({ hasPreviousSignIn });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    setState({ currentUser });
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex h-screen items-center justify-center flex-col gap-4">
        <Text className="text-blue-500" onPress={hasPreviousSignIn}>
          Has Previous Sign-In
        </Text>
        <Text className="text-blue-500" onPress={signIn}>
          Sign In
        </Text>
        <Text className="text-blue-500" onPress={signOut}>
          Sign Out
        </Text>
        <Text className="text-blue-500" onPress={getCurrentUser}>
          Get Current User
        </Text>
        <Text className="text-blue-500" onPress={revokeAccess}>
          Revoke Access
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
