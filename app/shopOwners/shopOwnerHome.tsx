import React from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const bookings = [
  {
    id: "1",
    userName: "John Doe",
    timing: "10:00 AM - 11:00 AM",
    location: "Downtown Salon",
    paid: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    timing: "11:30 AM - 12:30 PM",
    location: "City Center",
    paid: false,
  },
  {
    id: "3",
    userName: "Bob Johnson",
    timing: "1:00 PM - 2:00 PM",
    location: "Uptown Salon",
    paid: true,
  },
];

export default function ShopOwnerHome() {
  const handleAccept = (id: string) => {
    console.log(`Accepted booking with ID: ${id}`);
    // Add logic to update the booking status
  };

  const handleDecline = (id: string) => {
    console.log(`Declined booking with ID: ${id}`);
    // Add logic to update the booking status
  };

  const renderBooking = ({ item }: { item: typeof bookings[0] }) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{item.userName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Timing:</Text>
          <Text style={styles.value}>{item.timing}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{item.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment:</Text>
          <Text
            style={[styles.paymentStatus, { color: item.paid ? "green" : "red" }]}
          >
            {item.paid ? "Paid" : "Not Paid"}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAccept(item.id)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleDecline(item.id)}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1, // To ensure the container takes full height
    backgroundColor:"whitesmoke"
  },
  title: {
    marginTop:40,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20, // Add margin for spacing between title and list
    textAlign: "center", // Center the title
  },
  listContainer: {
    paddingBottom: 10, // Ensure there's padding at the bottom of the list
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  paymentStatus: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "green",
  },
  declineButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
