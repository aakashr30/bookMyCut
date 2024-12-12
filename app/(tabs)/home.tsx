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
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker
import { FontAwesome5 } from "@expo/vector-icons";
// import Nav from "@/components/NavBar.tsx/Nav";
import { router } from "expo-router";
import Nav from "../../components/Nav";

// Salon data type definition
interface Salon {
  id: number;
  name: string;
  image: string;
  rating: number;
  bookings: number;
  gender: string;
  openingTime: string;
  closingTime: string;
  barbers: string[];
  price: number;
}

// Salon data with added 'price' for each salon
const salons: Salon[] = [
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

const BookNow = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedBarber, setSelectedBarber] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Rating");
  const [numCustomers, setNumCustomers] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Filter and sort salons
  const filteredSalons = salons
    .filter((salon) => {
      return selectedGender === "All" || salon.gender === selectedGender;
    })
    .sort((a, b) => {
      if (selectedSort === "Rating") {
        return b.rating - a.rating;
      } else if (selectedSort === "Bookings") {
        return b.bookings - a.bookings;
      }
      return 0;
    });

  const toggleModal = (salon: Salon) => {
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

  const handleNumCustomersChange = (value: number) => {
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
      <Nav/>
      {/* <Nav /> */}
      <Pressable
      // onPress={() =>
      //   router.push({
      //     pathname: "/Screens/user/Home",
      //   })
      // }
      >
        <Text style={styles.pageTitle}>Book Now</Text>
      </Pressable>

      {/* Gender and Sorting Filters */}
      <View style={styles.filters}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue: any) => setSelectedGender(itemValue)}
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
            <Image source={{ uri: salon.image }} style={styles.salonImage} />
            <Text style={styles.salonName}>{salon.name}</Text>
            <Text style={styles.salonDetails}>Rating: {salon.rating} ⭐</Text>
            <Text style={styles.salonDetails}>Price: ${salon.price}</Text>
            <Text style={styles.salonDetails}>
              Open: {salon.openingTime} - {salon.closingTime}
            </Text>
            <Text style={styles.salonDetails}>Gender: {salon.gender}</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => toggleModal(salon)}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Book Appointment at {selectedSalon?.name}
            </Text>

            <Text style={styles.label}>Select Day:</Text>
            <Picker
              selectedValue={selectedDay}
              onValueChange={setSelectedDay}
              style={styles.picker}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>

            <Text style={styles.label}>Select Time Slot:</Text>
            <Picker
              selectedValue={selectedTimeSlot}
              onValueChange={setSelectedTimeSlot}
              style={styles.picker}
            >
              <Picker.Item label="10:00 AM" value="10:00 AM" />
              <Picker.Item label="11:00 AM" value="11:00 AM" />
              <Picker.Item label="1:00 PM" value="1:00 PM" />
              <Picker.Item label="3:00 PM" value="3:00 PM" />
              <Picker.Item label="5:00 PM" value="5:00 PM" />
            </Picker>

            <Text style={styles.label}>Select Barber:</Text>
            <Picker
              selectedValue={selectedBarber}
              onValueChange={setSelectedBarber}
              style={styles.picker}
            >
              {selectedSalon?.barbers.map((barber, index) => (
                <Picker.Item key={index} label={barber} value={barber} />
              ))}
            </Picker>

            <Text style={styles.label}>Number of Customers:</Text>
            <Picker
              selectedValue={numCustomers}
              onValueChange={handleNumCustomersChange}
              style={styles.picker}
            >
              {[...Array(10).keys()].map((n) => (
                <Picker.Item
                  key={n}
                  label={`${n + 1} Customer${n > 0 ? "s" : ""}`}
                  value={n + 1}
                />
              ))}
            </Picker>

            <Text style={styles.label}>Total Amount: ${totalAmount}</Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleBooking}
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handlePayment}
            >
              <Text style={styles.confirmButtonText}>Pay Online</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "gold",
    borderWidth: 1,
  },
  salonImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
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
    backgroundColor: "gold",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#222",
    padding: 30,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    color: "gold",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "gold",
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: "gold",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "gold",
    fontSize: 16,
  },
});

export default BookNow;
