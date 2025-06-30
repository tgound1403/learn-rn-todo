import { setIdToken } from "@/database/storage";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

export const hasPreviousSignIn = () : boolean => {
  try {
    const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
    console.log("Has previous sign in:", hasPreviousSignIn);
    return hasPreviousSignIn;
  } catch (error) {
    console.error("Error checking previous sign in:", error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error(error);
  }
};

export const configureGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId: '230862524329-nr06bh54frcr4kkg59e550nnghlp2qr7.apps.googleusercontent.com'
    });
}

export const getCurrentUser = () : User | null  => {
  try {
    const currentUser = GoogleSignin.getCurrentUser();
    if (!currentUser) {
      console.log("No user is currently signed in");
      return null;
    }
    console.log("Current user:", currentUser);
    return currentUser;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const signIn = async () : Promise<User | null> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      console.log("User signed in successfully:", response);
      setIdToken(response.data.idToken || "");
      return response.data;
    } else {
      console.log("Sign in was cancelled by user or failed:", response);
      return Promise.reject("Sign in was cancelled or failed");
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.warn("Sign in is already in progress");
          return null;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.warn("Play services not available or outdated");
          return null;
        default:
          console.error("An error occurred during sign in:", error);
          return null;
      }
    } else {
      console.error("An unexpected error occurred:", error);
      return null;
    }
  }
};

export const revokeAccess = async () => {
  try {
    await GoogleSignin.revokeAccess();
    console.log("Access revoked successfully");
  } catch (error) {
    console.error(error);
  }
};
