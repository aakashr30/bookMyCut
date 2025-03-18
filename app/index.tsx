import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Ensure correct path
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userToken) {
    return <Redirect href="/home" />;
  }

  // If userToken exists, redirect to another page (e.g., dashboard)
  return <Redirect href="/dashboard" />; // Change "/dashboard" to your desired page
}
