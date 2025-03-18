import React, { useEffect, useState,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchViewAllShop,
  fetchViewAllBarbers,
  fetchViewAllServices,
} from "../api/shopOwnerApi/shopOnwer";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

// Define TypeScript interfaces
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
  const { userToken, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user,userToken,"---ShopDetailsScreen")
        const shopData = await fetchViewAllShop();
        const barberData = await fetchViewAllBarbers();
        const serviceData = await fetchViewAllServices();

        if (shopData?.data?.length > 0) {
          const firstShop = shopData.data[0];
          setShop(firstShop);
        }

        if (barberData?.data) {
          setBarbers(
            barberData.data.map((barber: any) => ({
              name: barber.BarBarName,
              city: barber.From,
            }))
          );
        }

        if (serviceData?.data) {
          setServices(
            serviceData.data.map((service: any) => ({
              service: service.ServiceName,
              price: service.Rate,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle edit button press
  const onEditPress = () => {
    router.push("/shopOwners/shopOwnerRegister");
    console.log("Edit button pressed");
    // Navigate to an edit screen if applicable
    // navigation.navigate("EditShopScreen", { shop });
  };

  return (
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

        {/* Edit Button */}
        <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : shop ? (
          <>
            {/* Shop Details */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{shop.ShopName}</Text>
              <Text style={styles.detailText}>📍 {shop.City}</Text>
              <Text style={styles.detailText}>📞 {shop.Mobile}</Text>
              <Text style={styles.detailText}>🌐 {shop.website || "N/A"}</Text>
              <Text style={styles.detailText}>🕒 {shop.Timing}</Text>
            </View>

            {/* Barbers */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Barbers</Text>
              {barbers.length > 0 ? (
                barbers.map((barber, index) => (
                  <Text key={index} style={styles.detailText}>
                    ✂️ {barber.name} {barber.city ? `(${barber.city})` : ""}
                  </Text>
                ))
              ) : (
                <Text style={styles.detailText}>No barbers available</Text>
              )}
            </View>

            {/* Services */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Services</Text>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <Text key={index} style={styles.detailText}>
                    💇 {service.service} - ₹{service.price}
                  </Text>
                ))
              ) : (
                <Text style={styles.detailText}>No services available</Text>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.noDataText}>No shop details found</Text>
        )}
      </ScrollView>
    </View>
  );
};

// 🌟 Stylish UI Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#1F1F1F",
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  editButton: {
    padding: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailText: {
    color: "#CCCCCC",
    fontSize: 16,
    marginBottom: 6,
  },
  noDataText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ShopDetailsScreen;
