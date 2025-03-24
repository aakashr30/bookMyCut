import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const BookNow = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Rating");
  const [numCustomers, setNumCustomers] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const salons = [
    {
      id: 1,
      name: "Luxury Salon",
      image:
        "https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg",
      rating: 4.5,
      bookings: 120,
      gender: "Female",
      openingTime: "9:00 AM",
      closingTime: "9:00 PM",
      barbers: ["John", "Alice", "Mike"],
      price: 50,
    },
    {
      id: 2,
      name: "Modern Cuts",
      image:
        "https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg",
      rating: 4.8,
      bookings: 200,
      gender: "Unisex",
      openingTime: "10:00 AM",
      closingTime: "8:00 PM",
      barbers: ["Sam", "Emma", "Chris"],
      price: 60,
    },
    {
      id: 3,
      name: "Elegant Styles",
      image:
        "https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg",
      rating: 4.7,
      bookings: 150,
      gender: "Male",
      openingTime: "8:00 AM",
      closingTime: "7:00 PM",
      barbers: ["Tom", "Lucy", "Jack"],
      price: 55,
    },
  ];

  const filteredSalons = salons
    .filter(
      (salon) => selectedGender === "All" || salon.gender === selectedGender
    )
    .sort((a, b) => {
      if (selectedSort === "Rating") {
        return b.rating - a.rating;
      } else if (selectedSort === "Bookings") {
        return b.bookings - a.bookings;
      }
      return 0;
    });

  const toggleModal = (salon) => {
    setSelectedSalon(salon);
    setModalVisible(!modalVisible);
    setTotalAmount(salon.price);
  };

  const handleBooking = () => {
    if (!selectedDay || !selectedTimeSlot || !selectedBarber) {
      alert("Please fill all fields before booking.");
      return;
    }
    alert(
      `Booking for ${selectedSalon?.name} on ${selectedDay} at ${selectedTimeSlot} with ${selectedBarber}. Total: $${totalAmount}`
    );
    setModalVisible(false);
  };

  const handleNumCustomersChange = (value) => {
    setNumCustomers(value);
    if (selectedSalon) {
      setTotalAmount(value * selectedSalon.price);
    }
  };

  const handlePayment = () => {
    alert(`Payment of $${totalAmount} has been processed for your booking.`);
  };

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.pageTitle}>Book Now</Text>
      </Pressable>

      <View style={styles.filters}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Genders" value="All" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Unisex" value="Unisex" />
        </Picker>

        <View style={styles.sortOptions}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSelectedSort("Rating")}
          >
            <FontAwesome5
              name="star"
              size={20}
              color={selectedSort === "Rating" ? "gold" : "white"}
            />
            <Text
              style={[
                styles.sortText,
                selectedSort === "Rating" && { color: "gold" },
              ]}
            >
              Sort by Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSelectedSort("Bookings")}
          >
            <FontAwesome5
              name="clipboard-list"
              size={20}
              color={selectedSort === "Bookings" ? "gold" : "white"}
            />
            <Text
              style={[
                styles.sortText,
                selectedSort === "Bookings" && { color: "gold" },
              ]}
            >
              Sort by Bookings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.cardContainer}>
        {filteredSalons.map((salon) => (
          <View key={salon.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <Image source={{ uri: salon.image }} style={styles.salonImage} />
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.salonName}>{salon.name}</Text>
              <Text style={styles.salonDetails}>Rating: {salon.rating} ⭐</Text>
              <Text style={styles.salonDetails}>Price: ${salon.price}</Text>
              <Text style={styles.salonDetails}>
                Open: {salon.openingTime} - {salon.closingTime}
              </Text>
              <Text style={styles.salonDetails}>Gender: {salon.gender}</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => router.push("/screens/users/userBooking")}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Book Appointment at {selectedSalon?.name}
            </Text>
            {/* Additional modal content here */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    color: "gold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  filters: {
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
  },
  sortOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  cardLeft: {
    flex: 1,
    marginRight: 50,
  },
  cardRight: {
    flex: 2,
    justifyContent: "center",
  },
  salonImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  salonName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  salonDetails: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  bookButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  bookButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default BookNow;
