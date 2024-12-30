import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Navbar from "../Components/Navbar/Navbar";
import { Ionicons } from "@expo/vector-icons";

const bookings = [
  {
    id: "1",
    date: "29-Dec-2024",
    time: "3:00 PM",
    barberName: "John Doe",
    shopName: "Elite Barbers",
    price: "₹500",
    members: 1,
    status: "Pending",
  },
  {
    id: "2",
    date: "25-Dec-2024",
    time: "12:00 PM",
    barberName: "Jane Smith",
    shopName: "Grooming Hub",
    price: "₹800",
    members: 2,
    status: "Completed",
  },
];

export default function TabTwoScreen() {
  const handleRebook = (booking) => {
    console.log("Rebooking:", booking);
  };

  const handleCancel = (booking) => {
    console.log("Canceling booking:", booking);
  };

  const renderBookingCard = ({ item }) => (
    <ThemedView style={styles.card}>
      <View style={styles.statusContainer}>
        {item.status === "Completed" ? (
          <Ionicons name="checkmark-circle" size={24} color="white" />
        ) : (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <ThemedText style={[styles.shopName, styles.textWhite]}>
        {item.shopName}
      </ThemedText>

      <View style={styles.cardContent}>
        {/* Reduced height with row model */}
        <View style={styles.row}>
          <Ionicons name="person" size={20} color="white" />
          <ThemedText style={styles.textWhite}>
            {`Barber: ${item.barberName}`}
          </ThemedText>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar" size={20} color="white" />
          <ThemedText
            style={styles.textWhite}
          >{`Date: ${item.date}`}</ThemedText>
        </View>

        <View style={styles.row}>
          <Ionicons name="time" size={20} color="white" />
          <ThemedText
            style={styles.textWhite}
          >{`Time: ${item.time}`}</ThemedText>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash" size={20} color="white" />
          <ThemedText
            style={styles.textWhite}
          >{`Price: ${item.price}`}</ThemedText>
        </View>

        <View style={styles.row}>
          <Ionicons name="people" size={20} color="white" />
          <ThemedText
            style={styles.textWhite}
          >{`Members: ${item.members}`}</ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.rebookButton}
        onPress={() => handleRebook(item)}
      >
        <Text style={styles.buttonText}>Rebook</Text>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <View style={styles.screen}>
      <Navbar style={styles.navbar} />
      <ThemedText style={styles.header}>My Bookings</ThemedText>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  navbar: {
    height: 60,
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000", // Black navbar
    borderBottomWidth: 1,
    borderBottomColor: "#fff", // White border at the bottom
  },
  container: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#333", // Dark card background
    borderRadius: 12,
    padding: 12, // Reduced padding for compact design
    marginBottom: 16, // Reduced margin to shrink card size
    shadowColor: "#fff", // White shadow for contrast
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // White header text
    marginBottom: 16,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8, // Reduced space
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF0000", // Red for cancel button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff", // White text for cancel button
    fontWeight: "bold",
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8, // Reduced margin
  },
  cardContent: {
    marginBottom: 8, // Reduced space
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6, // Reduced vertical spacing between rows
  },
  textWhite: {
    color: "#fff", // White text color
    marginLeft: 8, // Space between icon and text
  },
  rebookButton: {
    backgroundColor: "#fff", // White background for the button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12, // Reduced space above the button
  },
  buttonText: {
    color: "#000", // Black text for the button
    fontWeight: "bold",
    fontSize: 16,
  },
});
