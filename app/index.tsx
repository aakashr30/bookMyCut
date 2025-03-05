import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ActivityIndicator, View } from "react-native";
export default function Index() {
  const { isLoading, userToken, userType } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userToken === null) {
    if (userType === "shopowner") {
      return <Redirect href="/shopOwners/shopOwnerHome" />;
    } else {
      return <Redirect href="/home" />;
    }
  } else {
    return <Redirect href="/(tabs)/tabhome" />;
  }
}
