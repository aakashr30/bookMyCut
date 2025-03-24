import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("App mounted, testing toast...");

    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Hello!",
        text2: "Toast should be working",
        position: "top",
        visibilityTime: 3000,
      });
      console.log("Toast.show() called");
    }, 3000);
  }, []);

  return (
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </>
    </AuthProvider>
  );
}
