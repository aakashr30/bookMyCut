import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Linear Gradient for background
import { FontAwesome5 } from "@expo/vector-icons"; // Font Awesome icons for design
import { Picker } from "@react-native-picker/picker"; // Picker import

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
// Sample list of barbers
const barbers = [
  { id: 1, name: "John", description: "Expert in Haircuts", rating: 4.5 },
  {
    id: 2,
    name: "Alex",
    description: "Specializes in Shaving and Massage",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Ryan",
    description: "Best in hair styling and trimming",
    rating: 4.9,
  },
];

// Sample list of available time slots
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Sample of already booked slots for today
const bookedTimes = ["10:00 AM", "2:00 PM", "4:00 PM"];

export default function BookNow() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2024-12-30");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [advancePayment, setAdvancePayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value

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

  const handleConfirmBooking = () => {
    // Logic for confirming booking (advance payment, etc.)
    console.log("Booking confirmed!");
  };

  return (
    <LinearGradient colors={["#000000", "#333333"]} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Shop Image */}
          <Image
            source={{
              uri: "https://www.shutterstock.com/image-photo/barbershop-interior-modern-hair-beauty-600nw-2092464307.jpg",
            }} // Replace with your shop image URL
            style={styles.shopImage}
          />
          <Text style={styles.title}>Book Now</Text>

          {/* Barber Selection */}
          <Text style={styles.subtitle}>Select Barber</Text>
          <Picker
            selectedValue={selectedBarber ? selectedBarber.id : ""}
            style={styles.picker}
            onValueChange={(itemValue) => {
              const barber = barbers.find((b) => b.id === itemValue);
              handleBarberSelect(barber);
            }}
          >
            <Picker.Item label="Select Barber" value="" />
            {barbers.map((barber) => (
              <Picker.Item
                key={barber.id}
                label={barber.name}
                value={barber.id}
              />
            ))}
          </Picker>

          {/* Barber Description & Rating */}
          {selectedBarber && (
            <View style={styles.barberDetails}>
              <Text style={styles.barberName}>{selectedBarber.name}</Text>
              <Text style={styles.barberDescription}>
                {selectedBarber.description}
              </Text>
              <Text style={styles.barberRating}>
                Rating: {selectedBarber.rating}
              </Text>
            </View>
          )}

          {/* Services Section */}
          <Text style={styles.subtitle}>Select Services</Text>
          <View style={styles.servicesList}>
            {servicesList.map((service) => (
              <View key={service.name} style={styles.serviceItem}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    selectedServices.includes(service.name) && styles.checked,
                  ]}
                  onPress={() => handleServiceSelect(service.name)}
                >
                  {selectedServices.includes(service.name) && (
                    <FontAwesome5 name="check" size={18} color="white" />
                  )}
                </TouchableOpacity>
                <Text style={styles.serviceText}>
                  {service.name} - ₹{service.price}
                </Text>
              </View>
            ))}
          </View>

          {/* Available Time Slots */}
          <Text style={styles.subtitle}>Select Time Slot</Text>
          <ScrollView horizontal style={styles.timeSlotContainer}>
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
                  ]}
                >
                  {timeSlot}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Total Amount Section */}
          <Text style={styles.totalAmountText}>
            Total: ₹{totalAmount + (advancePayment ? 20 : 0)}
          </Text>

          {/* Payment Options */}
          <View style={styles.paymentOptions}>
            <Text style={styles.paymentText}>Advance Payment (₹20 only):</Text>
            <TouchableOpacity
              onPress={handlePaymentOptionChange}
              style={styles.paymentOption}
            >
              <Text style={styles.paymentOptionText}>
                {advancePayment ? "Paid" : "Pay Now"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* UPI Payment Section */}
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
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  scrollViewContent: {
    paddingBottom: 40, // Ensures space for the footer, like the "Confirm Booking" button
  },
  shopImage: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginVertical: 20,
    textAlign: "center",
  },
  picker: {
    width: "80%",
    color: "white",
  },
  barberDetails: {
    marginVertical: 10,
    alignItems: "center",
  },
  barberName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  barberDescription: {
    fontSize: 16,
    color: "white",
  },
  barberRating: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  servicesList: {
    width: "100%",
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#FFD700", // Gold color when checked
  },
  serviceText: {
    fontSize: 16,
    color: "white",
  },
  timeSlotContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  timeSlot: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  bookedTimeSlot: {
    backgroundColor: "#777777", // Greyed out booked time slots
  },
  selectedTimeSlot: {
    backgroundColor: "#FFD700", // Gold color for selected slot
  },
  timeSlotText: {
    color: "white",
  },
  bookedText: {
    color: "#ccc", // Light grey for booked slots text
  },
  totalAmountText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginVertical: 0,
  },
  paymentOptions: {
    marginVertical: 60,
    alignItems: "center",
  },
  paymentText: {
    fontSize: 16,
    color: "white",
  },
  paymentOption: {
    backgroundColor: "#555555",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  paymentOptionText: {
    color: "white",
    fontWeight: "bold",
  },
  upiPaymentSection: {
    marginTop: 20,
  },
  upiButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
  upiButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 30,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   ScrollView,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Picker } from "@react-native-picker/picker";
// import Toast from "react-native-toast-message";
// import {
//   fetchViewAllBarbers,
//   fetchViewAllServices,
//   // fetchBookedTimeSlots,
// } from "../api/shopOwnerApi/shopOnwer"; // Import API functions

// export default function BookNow() {
//   const [servicesList, setServicesList] = useState<any[]>([]);
//   const [barbers, setBarbers] = useState<any[]>([]);
//   const [bookedTimes, setBookedTimes] = useState<string[]>([]);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [selectedBarber, setSelectedBarber] = useState<any>(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [advancePayment, setAdvancePayment] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0));

//   const timeSlots = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//   ];
//   //   // Handle time slot selection
//   //   const handleTimeSlotSelect = (timeSlot: string) => {
//   //     setSelectedTimeSlot(timeSlot);
//   //   };

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();

//     const fetchData = async () => {
//       try {
//         const servicesData = await fetchViewAllServices();
//         const barbersData = await fetchViewAllBarbers();
//         // const bookedTimeData = await fetchBookedTimeSlots();

//         if (servicesData?.success) setServicesList(servicesData.data);
//         if (barbersData?.success) setBarbers(barbersData.data);
//         // if (bookedTimeData?.success) setBookedTimes(bookedTimeData.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleServiceSelect = (serviceName: string) => {
//     let updatedServices = [...selectedServices];
//     if (updatedServices.includes(serviceName)) {
//       updatedServices = updatedServices.filter((item) => item !== serviceName);
//     } else {
//       updatedServices.push(serviceName);
//     }
//     setSelectedServices(updatedServices);
//     calculateTotalAmount(updatedServices);
//   };

//   const calculateTotalAmount = (selectedServices: string[]) => {
//     const total = selectedServices.reduce((acc, serviceName) => {
//       const serviceObj = servicesList.find(
//         (item) => item.ServiceName === serviceName
//       );
//       return acc + (serviceObj ? serviceObj.Rate : 0);
//     }, 0);
//     setTotalAmount(total);
//   };

//   const handleTimeSlotSelect = (timeSlot: string) => {
//     setSelectedTimeSlot(timeSlot);
//   };

//   const handlePaymentOptionChange = () => {
//     setAdvancePayment(!advancePayment);
//   };

//   return (
//     <LinearGradient colors={["#000000", "#333333"]} style={styles.container}>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <ScrollView
//           contentContainerStyle={styles.scrollViewContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <Image
//             source={{
//               uri: "https://www.shutterstock.com/image-photo/barbershop-interior-modern-hair-beauty-600nw-2092464307.jpg",
//             }}
//             style={styles.shopImage}
//           />
//           <Text style={styles.title}>Book Now</Text>

//           {/* Barber Selection */}
//           <Text style={styles.subtitle}>Select Barber</Text>
//           <Picker
//             selectedValue={selectedBarber ? selectedBarber._id : ""}
//             style={styles.picker}
//             onValueChange={(itemValue) => {
//               const barber = barbers.find((b) => b._id === itemValue);
//               setSelectedBarber(barber);
//             }}
//           >
//             <Picker.Item label="Select Barber" value="" />
//             {barbers.map((barber) => (
//               <Picker.Item
//                 key={barber._id}
//                 label={barber.name}
//                 value={barber._id}
//               />
//             ))}
//           </Picker>

//           {/* Service Selection */}
//           <Text style={styles.subtitle}>Select Services</Text>
//           {servicesList.map((service) => (
//             <TouchableOpacity
//               key={service.ServiceName}
//               style={[
//                 styles.serviceOption,
//                 selectedServices.includes(service.ServiceName) &&
//                   styles.selectedService,
//               ]}
//               onPress={() => handleServiceSelect(service.ServiceName)}
//             >
//               <Text style={styles.serviceText}>
//                 {service.ServiceName} - ₹{service.Rate}
//               </Text>
//             </TouchableOpacity>
//           ))}

//           {/* Available Time Slots */}
//           {/* <Text style={styles.subtitle}>Select Time Slot</Text>
//           <ScrollView horizontal style={styles.timeSlotContainer}>
//             {timeSlots.map((timeSlot) => (
//               <TouchableOpacity
//                 key={timeSlot}
//                 style={[
//                   styles.timeSlot,
//                   bookedTimes.includes(timeSlot) && styles.bookedTimeSlot,
//                   selectedTimeSlot === timeSlot && styles.selectedTimeSlot,
//                 ]}
//                 onPress={() =>
//                   !bookedTimes.includes(timeSlot) &&
//                   handleTimeSlotSelect(timeSlot)
//                 }
//                 disabled={bookedTimes.includes(timeSlot)}
//               >
//                 <Text
//                   style={[
//                     styles.timeSlotText,
//                     bookedTimes.includes(timeSlot) && styles.bookedText,
//                   ]}
//                 >
//                   {timeSlot}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView> */}

//           {/* Total Amount */}
//           <Text style={styles.totalAmountText}>
//             Total: ₹{totalAmount + (advancePayment ? 20 : 0)}
//           </Text>

//           {/* Payment Options */}
//           <View style={styles.paymentOptions}>
//             <Text style={styles.paymentText}>Advance Payment (₹20 only):</Text>
//             <TouchableOpacity
//               onPress={handlePaymentOptionChange}
//               style={styles.paymentOption}
//             >
//               <Text style={styles.paymentOptionText}>
//                 {advancePayment ? "Paid" : "Pay Now"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* UPI Payment Section (Placeholder) */}
//           <View style={styles.upiSection}>
//             <Text style={styles.paymentText}>Pay via UPI:</Text>
//             <TouchableOpacity style={styles.upiButton}>
//               <Text style={styles.paymentOptionText}>
//                 Proceed to UPI Payment
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </Animated.View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     backgroundColor: "#000000",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   scrollViewContent: {
//     paddingBottom: 40,
//   },
//   shopImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#FFD700",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 10,
//   },

//   /** Barber Picker **/
//   picker: {
//     backgroundColor: "#333",
//     color: "#fff",
//     borderRadius: 10,
//     marginBottom: 20,
//   },

//   /** Services List **/
//   serviceOption: {
//     padding: 12,
//     marginVertical: 5,
//     borderRadius: 10,
//     backgroundColor: "#444",
//   },
//   selectedService: {
//     backgroundColor: "#FFD700",
//   },
//   serviceText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   /** Time Slots **/
//   timeSlotContainer: {
//     flexDirection: "row",
//     marginVertical: 10,
//   },
//   timeSlot: {
//     padding: 12,
//     marginRight: 10,
//     borderRadius: 10,
//     backgroundColor: "#666",
//   },
//   bookedTimeSlot: {
//     backgroundColor: "red",
//   },
//   selectedTimeSlot: {
//     backgroundColor: "#FFD700",
//   },
//   timeSlotText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   bookedText: {
//     color: "#ddd",
//   },

//   /** Total Amount **/
//   totalAmountText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#FFD700",
//     marginVertical: 10,
//     textAlign: "center",
//   },

//   /** Payment Options **/
//   paymentOptions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     marginBottom: 20,
//   },
//   paymentText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   paymentOption: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#FFD700",
//     borderRadius: 10,
//   },
//   paymentOptionText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },

//   /** UPI Payment Section **/
//   upiSection: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   upiButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: "#228B22",
//     borderRadius: 10,
//   },
// });
