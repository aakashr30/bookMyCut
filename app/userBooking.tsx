import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
  LogBox
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  fetchViewSingleService,
  fetchViewSingleShopBarber,
} from "@/app/api/shopOwnerApi/shopOnwer";
import { AuthContext } from "@/app/context/AuthContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
// import { bookNowApi } from "../../api/userApi/userApi";

import { bookNowApi } from "./api/userApi/userApi";
import DateTimePicker from '@react-native-community/datetimepicker';

// Ignore specific warnings
LogBox.ignoreLogs([
  'scrollToIndex should be used',
  'Non-serializable values were found in the navigation state'
]);

interface Barber {
  id: string;
  name: string;
  description?: string;
  rating?: number;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function BookNow() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [advancePayment, setAdvancePayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [barberList, setBarberList] = useState<Barber[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { token: userToken } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!shopId || !userToken) {
          Alert.alert("Error", "Missing shop ID or token");
          return;
        }

        const [barberResponse, serviceResponse] = await Promise.all([
          fetchViewSingleShopBarber(userToken, shopId),
          fetchViewSingleService(userToken, shopId)
        ]);

        if (barberResponse?.data) {
          setBarberList(barberResponse.data.map((b: any) => ({
            id: b._id,
            name: b.BarBarName || "Barber",
            description: b.From || "Professional barber",
            rating: b.Rating || 4.5,
          })));
        }

        if (serviceResponse?.data) {
          setServiceList(serviceResponse.data.map((s: any) => ({
            id: s._id,
            name: s.ServiceName,
            price: Number(s.Rate) || 0,
          })));
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
        Alert.alert("Error", "Failed to load shop data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, userToken]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const total = selectedServices.reduce((sum, id) => {
      const service = serviceList.find(s => s.id === id);
      return sum + (service?.price || 0);
    }, 0);
    setTotalAmount(total);
  }, [selectedServices, serviceList]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select a date";
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleConfirmBooking = async () => {
    if (!selectedBarber) {
      Alert.alert("Error", "Please select a barber");
      return;
    }
    
    if (selectedServices.length === 0) {
      Alert.alert("Error", "Please select at least one service");
      return;
    }
    
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date");
      return;
    }
    
    if (!selectedTimePeriod) {
      Alert.alert("Error", "Please select a time period");
      return;
    }

    try {
      const bookingData = {
        shopId,
        barberId: selectedBarber.id,
        serviceIds: selectedServices,
        date: selectedDate.toISOString().split('T')[0],
        timePeriod: selectedTimePeriod,
        totalAmount: totalAmount + (advancePayment ? 20 : 0),
        advancePayment,
      };

      const response = await bookNowApi(bookingData, userToken);
      
      if (response.success) {
        Alert.alert("Success", "Booking confirmed!");
        // Reset form
        setSelectedServices([]);
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTimePeriod(null);
        setAdvancePayment(false);
      } else {
        Alert.alert("Error", response.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Failed to complete booking");
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#000000", "#1A1A1A"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading shop details...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#000000", "#1A1A1A", "#2D2D2D"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Book Appointment</Text>
            <View style={styles.divider} />
          </View>

          {/* Date Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="calendar" size={24} color="#FFD700" />
              <Text style={styles.sectionTitle}>Select Date</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {formatDate(selectedDate)}
              </Text>
              <MaterialCommunityIcons name="calendar-arrow-right" size={24} color="#FFD700" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Barber Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account" size={24} color="#FFD700" />
              <Text style={styles.sectionTitle}>Select Barber</Text>
            </View>
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedBarber?.id || ""}
                onValueChange={(value) => {
                  const barber = barberList.find(b => b.id === value);
                  setSelectedBarber(barber || null);
                }}
                style={styles.picker}
                dropdownIconColor="#FFD700"
                mode="dropdown"
              >
                <Picker.Item label="Select a barber" value="" />
                {barberList.map(barber => (
                  <Picker.Item 
                    key={barber.id} 
                    label={barber.name} 
                    value={barber.id} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Services Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="scissors-cutting" size={24} color="#FFD700" />
              <Text style={styles.sectionTitle}>Select Services</Text>
            </View>
            
            {serviceList.length > 0 ? (
              serviceList.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceItem,
                    selectedServices.includes(service.id) && styles.selectedService
                  ]}
                  onPress={() => handleServiceSelect(service.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.serviceCheckbox,
                    selectedServices.includes(service.id) && styles.serviceCheckboxSelected
                  ]}>
                    {selectedServices.includes(service.id) && (
                      <MaterialCommunityIcons name="check" size={16} color="#000" />
                    )}
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>₹{service.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noServicesText}>No services available</Text>
            )}
          </View>

          {/* Time Period Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#FFD700" />
              <Text style={styles.sectionTitle}>Select Time Period</Text>
            </View>
            
            <View style={styles.timePeriodContainer}>
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.timePeriodButton,
                    selectedTimePeriod === period && styles.selectedTimePeriod
                  ]}
                  onPress={() => setSelectedTimePeriod(period)}
                >
                  <Text style={[
                    styles.timePeriodText,
                    selectedTimePeriod === period && styles.selectedTimePeriodText
                  ]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Selected Options Summary */}
          <View style={styles.selectedOptionsSection}>
            <Text style={styles.selectedOptionsTitle}>Your Selection</Text>
            
            {selectedDate && (
              <View style={styles.selectedOption}>
                <Text style={styles.selectedOptionLabel}>Date:</Text>
                <Text style={styles.selectedOptionValue}>
                  {formatDate(selectedDate)}
                </Text>
              </View>
            )}

            {selectedBarber && (
              <View style={styles.selectedOption}>
                <Text style={styles.selectedOptionLabel}>Barber:</Text>
                <Text style={styles.selectedOptionValue}>
                  {selectedBarber.name}
                </Text>
              </View>
            )}

            {selectedServices.length > 0 && (
              <View style={styles.selectedOption}>
                <Text style={styles.selectedOptionLabel}>Services:</Text>
                <View style={styles.selectedServicesList}>
                  {selectedServices.map(serviceId => {
                    const service = serviceList.find(s => s.id === serviceId);
                    return (
                      <Text key={serviceId} style={styles.selectedOptionValue}>
                        • {service?.name} (₹{service?.price.toFixed(2)})
                      </Text>
                    );
                  })}
                </View>
              </View>
            )}

            {selectedTimePeriod && (
              <View style={styles.selectedOption}>
                <Text style={styles.selectedOptionLabel}>Time Period:</Text>
                <Text style={styles.selectedOptionValue}>{selectedTimePeriod}</Text>
              </View>
            )}

            <View style={styles.selectedOption}>
              <Text style={styles.selectedOptionLabel}>Total:</Text>
              <Text style={styles.selectedTotalValue}>
                ₹{(totalAmount + (advancePayment ? 20 : 0)).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment Summary */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Advance Payment</Text>
              <Text style={styles.summaryValue}>₹{advancePayment ? "20.00" : "0.00"}</Text>
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{(totalAmount + (advancePayment ? 20 : 0)).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity
              style={[
                styles.paymentButton,
                advancePayment && styles.paymentButtonActive
              ]}
              onPress={() => setAdvancePayment(!advancePayment)}
              activeOpacity={0.7}
            >
              <Text style={styles.paymentButtonText}>
                {advancePayment ? "Advance Paid (₹20)" : "Pay Advance (₹20)"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Booking Button */}
          <TouchableOpacity 
            style={[
              styles.confirmButton,
              (!selectedBarber || selectedServices.length === 0 || !selectedDate || !selectedTimePeriod) && 
                styles.confirmButtonDisabled
            ]}
            onPress={handleConfirmBooking}
            disabled={!selectedBarber || selectedServices.length === 0 || !selectedDate || !selectedTimePeriod}
            activeOpacity={0.7}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 16,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 12,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  datePickerText: {
    fontSize: 16,
    color: '#FFF',
  },
  pickerContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFD700',
    height: 180,
  },
  picker: {
    color: '#FFF',
    height: '100%',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedService: {
    backgroundColor: '#3A3A3A',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  serviceCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  serviceCheckboxSelected: {
    backgroundColor: '#FFD700',
  },
  serviceName: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  noServicesText: {
    color: '#AAA',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  timePeriodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timePeriodButton: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  selectedTimePeriod: {
    backgroundColor: '#4A3A00',
    borderColor: '#FFD700',
  },
  timePeriodText: {
    fontSize: 16,
    color: '#FFF',
  },
  selectedTimePeriodText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  selectedOptionsSection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectedOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
    paddingBottom: 8,
  },
  selectedOption: {
    marginBottom: 12,
  },
  selectedOptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 4,
  },
  selectedOptionValue: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
  },
  selectedServicesList: {
    marginLeft: 8,
  },
  selectedTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 8,
  },
  summarySection: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#AAA',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
  },
  paymentButton: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  paymentButtonActive: {
    backgroundColor: '#4A3A00',
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  confirmButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#666',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});