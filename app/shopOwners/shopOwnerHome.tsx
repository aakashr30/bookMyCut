import React, { useContext, useState, useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { fetchMyShop } from "../api/shopOwnerApi/shopOnwer";


interface Booking {
  id: string;
  userName: string;
  timing: string;
  location: string;
  paid: boolean;
}

const bookings: Booking[] = [
  {
    id: "1",
    userName: "John Doe",
    timing: "10:00 AM",
    location: "Salon A",
    paid: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    timing: "11:30 AM",
    location: "Salon B",
    paid: false,
  },
  {
    id: "3",
    userName: "Bob Johnson",
    timing: "1:00 PM",
    location: "Salon C",
    paid: true,
  },
];

export default function ShopOwnerHome() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { logout,token,setUser } = useContext(AuthContext);
  const [shoper,setShoper] = useState(null)
  const navigation = useNavigation();
  const drawerTranslateX = useRef(new Animated.Value(300)).current;

  const toggleDrawer = () => {
    if (!isDrawerVisible) {
      setDrawerVisible(true);
      Animated.timing(drawerTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(drawerTranslateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    }
  };

  useEffect(()=>{
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken"); // Correct way in React Native
        console.log("Token:", token);

        if (token) {
          try {
            const decoded = jwtDecode(token); // Correct usage
            console.log("Decoded Token:", decoded);
            let myShop = await fetchMyShop(decoded.id,token)
            console.log(myShop,"myshopdata")
            setShoper(myShop.data[0])
            setUser(myShop.data[0])
          } catch (error) {
            console.error("Invalid Token", error);
          }
        } else {
          console.warn("No token found!");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    }
    fetchToken()
  })
  return (
    <View style={styles.container}>
      {/* Header with Avatar & Name */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.ownerInfo}>
          <Avatar.Image
            size={55}
            source={{ uri: "https://via.placeholder.com/100" }}
          />
          <Text style={styles.shopOwnerName}>{shoper ? shoper.firstName : "Shoper"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Bookings</Text>
      </View>

      {/* Booking List */}
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.bookingTitle}>{item.userName}</Text>
            <Text style={styles.bookingDetails}>⏰ {item.timing}</Text>
            <Text style={styles.bookingDetails}>📍 {item.location}</Text>
            <Text
              style={[
                styles.paymentStatus,
                item.paid ? styles.paid : styles.notPaid,
              ]}
            >
              {item.paid ? "✅ Paid" : "❌ Not Paid"}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Right-side Drawer Modal */}
      {isDrawerVisible && (
        <Modal transparent visible={isDrawerVisible} animationType="fade">
          <Pressable style={styles.overlay} onPress={toggleDrawer} />
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: drawerTranslateX }] },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Avatar.Image
                size={70}
                source={{ uri: "https://via.placeholder.com/100" }}
              />
              <Text style={styles.drawerOwnerName}>Shop Owner</Text>
            </View>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => router.push("/shopOwners/ShopDetailsScreen")}
            >
              <Text style={styles.drawerText}>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem}>
              <Text style={styles.drawerText}>Offers</Text>
            </TouchableOpacity>

            <View style={styles.drawerBottom}>
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 15 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  ownerInfo: { flexDirection: "row", alignItems: "center" },
  shopOwnerName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bookingTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  bookingDetails: { fontSize: 15, color: "#666" },
  paymentStatus: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  paid: { color: "#2ECC71" },
  notPaid: { color: "#E74C3C" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  acceptButton: {
    backgroundColor: "#27AE60",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  declineButton: {
    backgroundColor: "#E74C3C",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    width: width * 0.75,
    backgroundColor: "#fff",
    height: "100%",
    padding: 25,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  drawerOwnerName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  drawerItem: { paddingVertical: 12 },
  drawerText: { fontSize: 18, color: "#333" },
  drawerBottom: { marginTop: "auto" },
  logoutButton: {
    padding: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
