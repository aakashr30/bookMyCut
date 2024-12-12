import { HelloWave } from "@/components/HelloWave";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to BookMyCut <HelloWave />
      </Text>
      <Text style={styles.subtitle}>
        Your personal haircut booking assistant
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("screens/UserSelection")} // Navigate to tabs
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#FFD700", // Gold color
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFD700", // Gold color
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FFD700", // Gold background
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  buttonText: {
    color: "#000", // Black text
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
