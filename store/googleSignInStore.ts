import { revokeAccess, signIn, signOut, hasPreviousSignIn, getCurrentUser } from "@/service/googleSignin";
import { User } from "@react-native-google-signin/google-signin";
import { create } from "zustand";

type GoogleSignInStore = {
    isSignedIn: boolean;
    user: User | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    revokeAccess: () => Promise<void>;
}

export const useGoogleSignInStore = create<GoogleSignInStore>((set) => ({
    isSignedIn: hasPreviousSignIn(),
    user: getCurrentUser(),

    signIn: async () => {
        try {
            const userInfo = await signIn();
            set({ isSignedIn: true, user: userInfo });
        } catch (error) {
            console.error("Sign in failed", error);
        }
    },

    signOut: async () => {
        try {
            await signOut();
            set({ isSignedIn: false, user: null });
        } catch (error) {
            console.error("Sign out failed", error);
        }
    },

    revokeAccess: async () => {
        try {
            await revokeAccess();
            set({ isSignedIn: false, user: null });
        } catch (error) {
            console.error("Revoke access failed", error);
        }
    },
}));