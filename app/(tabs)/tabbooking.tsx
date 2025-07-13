import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { fetchViewAllShop } from '../api/shopOwnerApi/shopOnwer';

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
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    fetchSalons();
  }, [navigation]);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchViewAllShop();
      console.log("API Response:", response);
      
      if (response && response.data) {
        const transformedSalons = response.data.map(shop => ({
          id: shop.shopId || shop._id,
          name: shop.ShopName || shop.firstName,
          image: shop.shopImage || "https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg",
          rating: shop.rating || 4.0,
          bookings: shop.bookingsCount || 0,
          gender: shop.genderPreference || "Unisex",
          openingTime: shop.Timing || "9:00 AM",
          closingTime: shop.closingTime || "9:00 PM",
          barbers: shop.barbers || ["John", "Alice"],
          price: shop.price || 50,
          services: shop.services || [],
          location: shop.City || "Unknown location"
        }));
        setSalons(transformedSalons);
      } else {
        setError("No salons data received from server");
      }
    } catch (err) {
      console.error("Error fetching salons:", err);
      setError("Failed to load salons. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSalons = salons
    .filter((salon) => selectedGender === "All" || salon.gender === selectedGender)
    .sort((a, b) => {
      if (selectedSort === "Rating") return b.rating - a.rating;
      if (selectedSort === "Bookings") return b.bookings - a.bookings;
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

 const navigateToBooking = (shopId) => {
  console.log("Navigating to booking for shop ID:", shopId);
   router.push(`/Search/${shopId}`)
};

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="gold" />
        <Text style={styles.loadingText}>Loading salons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={fetchSalons}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        {filteredSalons.length > 0 ? (
          filteredSalons.map((salon) => (
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
                <Text style={styles.salonDetails}>Location: {salon.location}</Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => navigateToBooking(salon.id)}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noSalonsText}>No salons found matching your criteria</Text>
        )}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'gold',
    padding: 12,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noSalonsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  pageTitle: {
    marginTop: 20,
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
    padding: 8,
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
    marginRight: 15,
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
    marginBottom: 3,
  },
  bookButton: {
    backgroundColor: "gold",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: "black",
    fontSize: 14,
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
    textAlign: 'center',
  },
});

export default BookNow;