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
  StatusBar,
  Animated,
  Platform,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMyShop } from "../api/shopOwnerApi/shopOnwer";

interface Booking {
  id: string;
  userName: string;
  userIcon: string;
  timing: string;
  location: string;
  paid: boolean;
}

const bookings: Booking[] = [
  {
    id: "1",
    userName: "John Doe",
    userIcon: "👨‍💼",
    timing: "10:00 AM",
    location: "Salon A",
    paid: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    userIcon: "👩‍🦰",
    timing: "11:30 AM",
    location: "Salon B",
    paid: false,
  },
  {
    id: "3",
    userName: "Bob Johnson",
    userIcon: "👨‍🦱",
    timing: "1:00 PM",
    location: "Salon C",
    paid: true,
  },
];

export default function ShopOwnerHome() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { logout, token, setUser } = useContext(AuthContext);
  const [shoper, setShoper] = useState(null);
  const navigation = useNavigation();
  const drawerTranslateX = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;

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
        toValue: Dimensions.get("window").width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    }
  };
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken"); // Correct way in React Native
        console.log("Token:", token);

        if (token) {
          try {
            const decoded = jwtDecode(token); // Correct usage
            console.log("Decoded Token:", decoded);
            let myShop = await fetchMyShop(decoded.id, token);
            console.log(myShop, "myshopdata");
            setShoper(myShop.data[0]);
            setUser(myShop.data[0]);
          } catch (error) {
            console.error("Invalid Token", error);
          }
        } else {
          console.warn("No token found!");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchToken();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <View style={styles.gradientBackground}>
          {/* Header with Menu Icon & Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Bookings</Text>
            <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
              <Avatar.Text
                size={40}
                label={shoper?.firstName?.charAt(0) || "NA"}
                color="#fff"
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          {/* Booking List */}
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.userInfoContainer}>
                    <Text style={styles.userIcon}>{item.userIcon}</Text>
                    <Text style={styles.bookingTitle}>{item.userName}</Text>
                  </View>
                  <View
                    style={[
                      styles.paymentStatus,
                      item.paid ? styles.paid : styles.notPaid,
                    ]}
                  >
                    <Text
                      style={[
                        styles.paymentStatusText,
                        item.paid ? styles.paidText : styles.notPaidText,
                      ]}
                    >
                      {item.paid ? "Paid" : "Pending"}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.bookingDetails}>{item.timing}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.bookingDetails}>{item.location}</Text>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineButton}>
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Right-side Drawer Modal */}
        {isDrawerVisible && (
          <Modal transparent visible={isDrawerVisible} animationType="none">
            <Pressable style={styles.overlay} onPress={toggleDrawer} />
            <Animated.View
              style={[
                styles.drawer,
                { transform: [{ translateX: drawerTranslateX }] },
              ]}
            >
              <View style={styles.drawerHeader}>
                <View style={styles.shopOwnerAvatarContainer}>
                  <Text style={styles.shopOwnerAvatar}>👨‍💼</Text>
                </View>
                <View style={styles.drawerOwnerInfo}>
                  <Text style={styles.drawerOwnerName}>
                    {shoper ? shoper.firstName : "Shoper"}
                  </Text>
                  <Text style={styles.drawerOwnerEmail}>
                    {shoper ? shoper.email : "owner@example.com"}
                  </Text>
                </View>
              </View>

              <View style={styles.drawerDivider} />

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  toggleDrawer();
                  router.push("/screens/shopOwners/ShopDetailsScreen");
                }}
              >
                <FontAwesome5 name="user-alt" size={20} color="#fff" />
                <Text style={styles.drawerText}>Profile Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerItem}>
                <FontAwesome5 name="tags" size={20} color="#fff" />
                <Text style={styles.drawerText}>Offers</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerItem}>
                <FontAwesome5 name="calendar-alt" size={20} color="#fff" />
                <Text style={styles.drawerText}>Appointment History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerItem}>
                <FontAwesome5 name="bell" size={20} color="#fff" />
                <Text style={styles.drawerText}>Notifications</Text>
              </TouchableOpacity>

              <View style={styles.drawerBottom}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => {
                    toggleDrawer();
                    logout();
                  }}
                >
                  <FontAwesome5 name="sign-out-alt" size={18} color="#000" />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 40,
  },
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    padding: 4,
  },
  avatar: {
    backgroundColor: "#333",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  cardBody: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  bookingDetails: {
    fontSize: 15,
    color: "#ddd",
    marginLeft: 8,
  },
  paymentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  paymentStatusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  paid: {
    backgroundColor: "rgba(0, 180, 0, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(0, 180, 0, 0.6)",
  },
  notPaid: {
    backgroundColor: "rgba(220, 0, 0, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(220, 0, 0, 0.6)",
  },
  paidText: {
    color: "#5FFF5F",
  },
  notPaidText: {
    color: "#FF5F5F",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  declineButton: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  declineButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    width: width * 0.8,
    maxWidth: 360,
    backgroundColor: "#121212",
    height: "100%",
    padding: 24,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  shopOwnerAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  shopOwnerAvatar: {
    fontSize: 30,
  },
  drawerOwnerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  drawerOwnerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  drawerOwnerEmail: {
    fontSize: 14,
    color: "#aaa",
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 24,
  },
  drawerItem: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  drawerText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 16,
  },
  drawerBottom: {
    marginTop: "auto",
  },
  logoutButton: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
