import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Linear Gradient for background
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // Font Awesome icons for design
import { Picker } from "@react-native-picker/picker"; // Picker import
import {
  fetchAddShop,
  fetchViewSingleService,
  fetchViewSingleShopBarber,
} from "@/app/api/shopOwnerApi/shopOnwer";
import { AuthContext } from "@/app/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import TimeRangePicker from "../shopOwners/TimeRangePicker";

// Sample list of services
const servicesList = [
  { name: "Haircut", price: 100 },
  { name: "Shaving", price: 50 },
  { name: "Massage", price: 200 },
];
interface Barber {
  name: string;
  city?: string;
}

interface Service {
  service: string;
  price: number;
}

// const timeSlots = [
//   "9:00 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "12:00 PM",
//   "1:00 PM",
//   "2:00 PM",
//   "3:00 PM",
//   "4:00 PM",
//   "5:00 PM",
// ];

// Sample of already booked slots for today
// const bookedTimes = ["10:00 AM", "2:00 PM", "4:00 PM"];

export default function BookNow() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2024-12-30");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [advancePayment, setAdvancePayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value
  const [barberList, setBarberList] = useState<any[]>([]); // Initialize as an array
  const [serviceList, setServices] = useState<any[]>([]); // Initialize as an array
  const { token: userToken, user } = useContext(AuthContext);
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    start: "",
    end: "",
  });

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        console.log("Fetching barbers...");

        const barberData = await fetchViewSingleShopBarber(userToken);
        console.log("Barber data in tsx", barberData);
        if (barberData?.data) {
          setBarberList(
            barberData.data.map((barber: any) => ({
              id: barber.id, // Ensure correct property names from API response
              name: barber.BarBarName,
              description: barber.Description || "Experienced Barber",
              rating: barber.Rating || 4.5, // Default rating if not provided
            }))
          );
        }
        // Fetch service data
        if (userToken) {
          const serviceData = await fetchViewSingleService(userToken);
          console.log("Service data in tsx", serviceData);
          if (serviceData?.data) {
            setServices(
              serviceData.data.map((service: any) => ({
                service: service.ServiceName,
                price: service.Price,
              }))
            );
          }
        }
      } catch (error) {
        console.log("Error fetching barbers", error);
      }
    };

    if (userToken) {
      fetchBarbers();
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, userToken]);

  // Fade-in animation when the component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to full opacity
      duration: 1500, // Duration of animation
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Handle service selection
  const handleServiceSelect = (service: string) => {
    let updatedServices = [...selectedServices];
    if (updatedServices.includes(service)) {
      updatedServices = updatedServices.filter((item) => item !== service);
    } else {
      updatedServices.push(service);
    }
    setSelectedServices(updatedServices);
    calculateTotalAmount(updatedServices);
  };

  // Calculate total amount based on selected services
  const calculateTotalAmount = (selectedServices: string[]) => {
    const total = selectedServices.reduce((acc, service) => {
      const serviceObj = servicesList.find((item) => item.name === service);
      return acc + (serviceObj ? serviceObj.price : 0);
    }, 0);
    setTotalAmount(total);
  };
  const bookedTimeSlots = [
    { start: "10:00 AM", end: "11:00 AM" },
    { start: "2:00 PM", end: "3:00 PM" },
  ];
  // Handle advance payment option
  const handlePaymentOptionChange = () => {
    setAdvancePayment(!advancePayment);
  };

  // Handle barber selection
  const handleBarberSelect = (barber: any) => {
    setSelectedBarber(barber);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };
  const handleTimeRangeSelection = (startTime: string, endTime: string) => {
    setSelectedTimeRange({ start: startTime, end: endTime });
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed!", {
      barber: selectedBarber,
      services: selectedServices,
      date: selectedDate,
      timeRange: selectedTimeRange,
      amount: totalAmount,
      advancePayment,
    });
  };
  return (
    <LinearGradient
      colors={["#000000", "#1A1A1A", "#2D2D2D"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Book Appointment</Text>
            <View style={styles.divider} />
          </View>

          {/* Shop Image with overlay */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://www.shutterstock.com/image-photo/barbershop-interior-modern-hair-beauty-600nw-2092464307.jpg",
              }}
              style={styles.shopImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
          </View>

          {/* Section: Barber Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="account-group"
                size={22}
                color="#fff"
              />
              <Text style={styles.subtitle}>Choose Your Barber</Text>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedBarber ? selectedBarber.id : ""}
                style={styles.picker}
                dropdownIconColor="black"
                onValueChange={(itemValue) => {
                  const barber = barberList.find((b) => b.id === itemValue);
                  handleBarberSelect(barber);
                }}
              >
                <Picker.Item label="Select a barber" value="" color="black" />
                {barberList.map((barber) => (
                  <Picker.Item
                    key={barber.id}
                    label={barber.name}
                    value={barber.id}
                    color="black"
                  />
                ))}
              </Picker>
            </View>

            {/* Barber Description & Rating */}
            {selectedBarber && (
              <View style={styles.barberCard}>
                <View style={styles.barberHeader}>
                  <Text style={styles.barberName}>{selectedBarber.name}</Text>
                  <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                    <Text style={styles.barberRating}>
                      {selectedBarber.rating}
                    </Text>
                  </View>
                </View>
                <Text style={styles.barberDescription}>
                  {selectedBarber.description}
                </Text>
              </View>
            )}
          </View>

          {/* Section: Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="scissors-cutting"
                size={22}
                color="#fff"
              />
              <Text style={styles.subtitle}>Select Services</Text>
            </View>

            <View style={styles.servicesList}>
              {servicesList.map((service) => (
                <TouchableOpacity
                  key={service.name}
                  style={styles.serviceItem}
                  onPress={() => handleServiceSelect(service.name)}
                >
                  <View style={styles.serviceInfo}>
                    <View
                      style={[
                        styles.checkbox,
                        selectedServices.includes(service.name) &&
                          styles.checked,
                      ]}
                    >
                      {selectedServices.includes(service.name) && (
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color="#000"
                        />
                      )}
                    </View>
                    <Text style={styles.serviceText}>{service.name}</Text>
                  </View>
                  <Text style={styles.servicePrice}>₹{service.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section: Time Slots */}
          {/* Section: Time Slots */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={22}
                color="#fff"
              />
              <Text style={styles.subtitle}>Choose Time Slot</Text>
            </View>

            <TimeRangePicker
              startHour={9}
              endHour={18}
              interval={15}
              onRangeSelected={handleTimeRangeSelection}
              alreadyBookedSlots={bookedTimeSlots}
            />

            {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.timeSlotContainer}
            >
              {timeSlots.map((timeSlot) => (
                <TouchableOpacity
                  key={timeSlot}
                  style={[
                    styles.timeSlot,
                    bookedTimes.includes(timeSlot) && styles.bookedTimeSlot,
                    selectedTimeSlot === timeSlot && styles.selectedTimeSlot,
                  ]}
                  onPress={() =>
                    !bookedTimes.includes(timeSlot) &&
                    handleTimeSlotSelect(timeSlot)
                  }
                  disabled={bookedTimes.includes(timeSlot)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      bookedTimes.includes(timeSlot) && styles.bookedText,
                      selectedTimeSlot === timeSlot && styles.selectedTimeText,
                    ]}
                  >
                    {timeSlot}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView> */}
          </View>

          {/* Section: Payment Summary */}
          <View style={styles.summarySection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>
                ₹{totalAmount + (advancePayment ? 20 : 0)}
              </Text>
            </View>

            {/* Payment Options */}
            <View style={styles.paymentOptions}>
              <View style={styles.advancePaymentRow}>
                <Text style={styles.paymentText}>Advance Payment</Text>
                <Text style={styles.advanceAmount}>₹20</Text>
              </View>

              <TouchableOpacity
                onPress={handlePaymentOptionChange}
                style={[
                  styles.paymentButton,
                  advancePayment && styles.paidButton,
                ]}
              >
                <Text
                  style={[
                    styles.paymentButtonText,
                    advancePayment && styles.paidButtonText,
                  ]}
                >
                  {advancePayment ? "Paid" : "Pay Now"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton}>
            <Text
              style={styles.confirmButtonText}
              onPress={handleConfirmBooking}
            >
              Confirm Booking
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 2,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 16,
  },
  shopImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    backgroundColor: "black",
    marginBottom: 12,
  },
  picker: {
    width: "100%",
    color: "#fff",
    height: 50,
  },
  barberCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  barberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  barberName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,215,0,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  barberRating: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
    marginLeft: 4,
  },
  barberDescription: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
  },
  servicesList: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  serviceText: {
    fontSize: 16,
    color: "#fff",
  },
  servicePrice: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  timeSlotContainer: {
    marginTop: 8,
    paddingBottom: 8,
  },
  timeSlot: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  bookedTimeSlot: {
    backgroundColor: "rgba(120,120,120,0.2)",
    borderColor: "rgba(120,120,120,0.3)",
  },
  selectedTimeSlot: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  timeSlotText: {
    color: "#fff",
    fontWeight: "500",
  },
  bookedText: {
    color: "#888",
  },
  selectedTimeText: {
    color: "#000",
    fontWeight: "600",
  },
  summarySection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  totalLabel: {
    fontSize: 16,
    color: "#ccc",
  },
  totalAmount: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  paymentOptions: {
    marginTop: 16,
  },
  advancePaymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentText: {
    fontSize: 15,
    color: "#ccc",
  },
  advanceAmount: {
    fontSize: 15,
    color: "#fff",
  },
  paymentButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  paidButton: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#fff",
  },
  paidButtonText: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
