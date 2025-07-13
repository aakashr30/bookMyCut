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

export default function Search() {

      const { shopId } = useLocalSearchParams();
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
 
  return (
    <View>
      <Text style={{color:"white"}}>Booking screen for Shop ID: {shopId}</Text>
    </View>
  );
}