import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  fetchViewAllShop,
  fetchViewSingleShopBarber,
  fetchViewSingleService,
} from "../../api/shopOwnerApi/shopOnwer";
import { router } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface Barber {
  name: string;
  city?: string;
}

interface Service {
  service: string;
  price: number;
}

interface Shop {
  ShopName: string;
  ShopAddress: string;
  Timing: string[];
  City: string;
  Mobile: string;
  website: string;
}

interface Props {
  navigation: any;
}

const ShopDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const { token: userToken, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user, userToken, "---ShopDetailsScreen");

        // Fetch shop data
        const shopData = await fetchViewAllShop();
        if (shopData?.data?.length > 0) {
          setShop(shopData.data[0]);
        }

        // Fetch barber data
        if (userToken) {
          const barberData = await fetchViewSingleShopBarber(userToken);
          if (barberData?.data) {
            setBarbers(
              barberData.data.map((barber: any) => ({
                name: barber.BarBarName,
                city: barber.From,
              }))
            );
          }
        }

        // Fetch service data
        if (userToken) {
          const serviceData = await fetchViewSingleService(userToken);
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
        console.error("Error fetching shop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  const onEditPress = () => {
    router.push("/shopOwners/shopOwnerRegister");
  };

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Shop Details</Text>
          <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
            <Ionicons name="create-outline" size={20} color="#FFD700" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text style={styles.loadingText}>Loading shop details...</Text>
          </View>
        ) : shop ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Shop Banner (with icon instead of image) */}
            <View style={styles.bannerContainer}>
              <View style={styles.iconBanner}>
                <MaterialIcons name="storefront" size={80} color="#FFD700" />
              </View>
              <View style={styles.shopNameContainer}>
                <Text style={styles.shopName}>{shop.ShopName}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.8</Text>
                  <Text style={styles.ratingCount}>(124)</Text>
                </View>
              </View>
            </View>

            {/* Shop Info Card */}
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location" size={20} color="#FFD700" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>
                    {shop.ShopAddress || shop.City}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="call" size={20} color="#FFD700" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Contact</Text>
                  <Text style={styles.infoValue}>{shop.Mobile}</Text>
                </View>
              </View>

              {shop.website && (
                <View style={styles.infoRow}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="web" size={20} color="#FFD700" />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Website</Text>
                    <Text style={styles.infoValue}>{shop.website}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Business Hours */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="time-outline" size={20} color="#FFD700" />
                <Text style={styles.sectionTitle}>Business Hours</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.daysContainer}
              >
                {/* {weekdays.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayTab,
                      selectedDay === day && styles.selectedDayTab,
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDay === day && styles.selectedDayText,
                      ]}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))} */}
              </ScrollView>

              <View style={styles.timingContainer}>
                <Text style={styles.timingText}>
                  <Text style={styles.infoValue}>{shop.Timing}</Text>
                </Text>
              </View>
            </View>

            {/* Services */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <MaterialIcons name="content-cut" size={20} color="#FFD700" />
                <Text style={styles.sectionTitle}>Services</Text>
              </View>

              {services.length > 0 ? (
                services.map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <Text style={styles.serviceName}>{service.service}</Text>
                    <Text style={styles.servicePrice}>₹{service.price}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No services available</Text>
              )}
              {/* 
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>Book Appointment</Text>
              </TouchableOpacity> */}
            </View>

            {/* Barbers */}
            <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <FontAwesome5 name="user-tie" size={16} color="#FFD700" />
                <Text style={styles.sectionTitle}>Our Barbers</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.barbersContainer}
              >
                {barbers.length > 0 ? (
                  barbers.map((barber, index) => (
                    <View key={index} style={styles.barberItem}>
                      <View style={styles.barberImageContainer}>
                        <Ionicons name="person" size={36} color="#FFD700" />
                      </View>
                      <Text style={styles.barberName}>{barber.name}</Text>
                      {barber.city && (
                        <Text style={styles.barberCity}>{barber.city}</Text>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No barbers available</Text>
                )}
              </ScrollView>
            </View>

            {/* Reviews Placeholder */}
            {/* <View style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <Ionicons name="star-half" size={20} color="#FFD700" />
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
              </View>
              <Text style={styles.emptyText}>No reviews yet</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>Write a Review</Text>
              </TouchableOpacity>
            </View> */}

            {/* Bottom padding */}
            <View style={styles.bottomPadding} />
          </ScrollView>
        ) : (
          <View style={styles.noDataContainer}>
            <Ionicons name="alert-circle-outline" size={64} color="#666" />
            <Text style={styles.noDataText}>No shop details found</Text>
            <TouchableOpacity style={styles.setupButton} onPress={onEditPress}>
              <Text style={styles.setupButtonText}>Setup Your Shop</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  editText: {
    color: "#FFD700",
    marginRight: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#999",
    marginTop: 12,
    fontSize: 16,
  },
  bannerContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  iconBanner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  shopNameContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
  },
  shopName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "bold",
  },
  ratingCount: {
    color: "#ccc",
    marginLeft: 2,
    fontSize: 12,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    color: "#999",
    fontSize: 12,
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  callButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  callButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  daysContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  dayTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#2A2A2A",
  },
  selectedDayTab: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
  },
  dayText: {
    color: "#ccc",
    fontSize: 14,
  },
  selectedDayText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  timingContainer: {
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  timingText: {
    color: "#fff",
    fontSize: 16,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  serviceName: {
    color: "#fff",
    fontSize: 16,
  },
  servicePrice: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewAllButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  viewAllText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  barbersContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  barberItem: {
    alignItems: "center",
    marginRight: 16,
    width: 80,
  },
  barberImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  barberName: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  barberCity: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 12,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  noDataText: {
    color: "#888",
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
  },
  setupButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 16,
  },
  setupButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomPadding: {
    height: 24,
  },
});

export default ShopDetailsScreen;
