import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  fetchViewAllShop,
  fetchAddShop,
  fetchAddBarbers,
  fetchaddService,
} from "../api/shopOwnerApi/shopOnwer";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons"; // For delete icons
import Toast from "react-native-toast-message";
import { jwtDecode } from "jwt-decode";
import Axios from '../Axios/axiosInstance'

interface Barber {
  BarBarName: string;
  From: string;
  shopId: string;
}

interface Service {
  ServiceName: string;
  Rate: string;
  shopId: string;
}

interface Shop {
  name: string;
  address: string;
  website: string;
  timing: string;
}

const RegisterScreen: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      BarBarName: "",
      From: "",
      shopId: "",
    },
  ]);
  const [services, setServices] = useState<Service[]>([
    { ServiceName: "", Rate: "", shopId: "" },
  ]);
  const [timings, setTimings] = useState<string[]>([""]);
  const [shop, setShop] = useState<Shop>({
    name: "",
    address: "",
    website: "",
    timing: "",
  });
  const { token: userToken } = useContext(AuthContext);

  console.log(userToken, "userToken...........");
  useEffect(() => {
    const viewAllShop = async () => {
      try {
        const data = await fetchViewAllShop();
        if (data?.data?.length > 0) {
          const firstShop = data.data[0];
          setShop({
            name: firstShop.ShopName || "",
            address: firstShop.ShopAddress || "",
            website: firstShop.website || "",
            timing: firstShop.timing || "",
          });
          setTimings(firstShop.timings || [""]);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    viewAllShop();
  }, []);

  const handleShopChange = (text: string, field: keyof Shop) => {
    setShop({ ...shop, [field]: text });
  };

  const handleSubmit = async () => {
    console.log(userToken, "usertoekjn");
    if (!shop.name || !shop.address) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const shopResponse = await fetchAddShop(shop);
      if (shopResponse.success) {
        Alert.alert("Success", "Shop registered successfully!");

        // await fetchAddBarbers(barbers, userToken);
        // await fetchaddServices(services, userToken);
      } else {
        Alert.alert(
          "Error",
          shopResponse.message || "Failed to register shop."
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Call this function when submitting the form
  const handleAddBarber = async () => {
    console.log(userToken, "usertoekjn in add barber");
    if (!userToken) {
      Alert.alert("Error", "User token is missing. Please log in again.");
      return;
    }

    try {
      // Decode the token and extract shopId
      const decoded: any = jwtDecode(userToken);
      const shopId = decoded?.id; // Make sure 'id' is the correct property for shopId
      console.log(shopId, "shopId");
      if (!shopId) {
        Alert.alert("Error", "Shop ID is missing in token.");
        return;
      }

      // Update each barber with the shopId
      const updatedBarbers = barbers.map((barber) => ({
        ...barber,
        shopId,
      }));

      // Call the API with the updated barbers list
      const response = await fetchAddBarbers(updatedBarbers,Axios);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Barbers added successfully!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response?.message || "Failed to add barbers.",
        });
      }
    } catch (error) {
      console.error("Failed to add barbers:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  const handleAddService = async () => {
    if (!userToken) {
      Alert.alert("Error", "User token is missing. Please log in again.");
      return;
    }

    try {
      // Decode the token to extract shopId
      const decoded: any = jwtDecode(userToken);
      const shopId = decoded?.id; // Ensure 'id' is the correct property

      if (!shopId) {
        Alert.alert("Error", "Shop ID is missing in token.");
        return;
      }

      // Update each service with the shopId
      const updatedServices = services.map((service) => ({
        ...service,
        shopId,
      }));

      // Call API with updated services list
      const response = await fetchaddService(updatedServices);

      if (response?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Services added successfully!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response?.message || "Failed to add services.",
        });
      }
    } catch (error) {
      console.error("Failed to add services:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register Shop</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionHeader}>Shop Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Shop Name"
          placeholderTextColor="#999"
          value={shop.name}
          onChangeText={(text) => handleShopChange(text, "name")}
        />
        <TextInput
          style={styles.input}
          placeholder="Shop Address"
          placeholderTextColor="#999"
          value={shop.address}
          onChangeText={(text) => handleShopChange(text, "address")}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Website"
          placeholderTextColor="#999"
          value={shop.website}
          onChangeText={(text) => handleShopChange(text, "website")}
        />

        {/* Timings Section */}
        <Text style={styles.sectionHeader}>Timings</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Timing"
          placeholderTextColor="#999"
          value={shop.timing}
          onChangeText={(text) => handleShopChange(text, "timing")}
        />

        {/* Submit Button moved here after Timings */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Barber Section */}
        <Text style={styles.sectionHeader}>Barbers</Text>
        {barbers.map((barber, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Barber Name"
              placeholderTextColor="#999"
              value={barber.BarBarName}
              onChangeText={(text) => {
                const updatedBarbers = [...barbers];
                updatedBarbers[index].BarBarName = text;
                setBarbers(updatedBarbers);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Barber City"
              placeholderTextColor="#999"
              value={barber.From}
              onChangeText={(text) => {
                const updatedBarbers = [...barbers];
                updatedBarbers[index].From = text;
                setBarbers(updatedBarbers);
              }}
            />
            <TouchableOpacity
              onPress={() => setBarbers(barbers.filter((_, i) => i !== index))}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddBarber}>
          <Text style={styles.addButtonText}>+ Add Barber</Text>
        </TouchableOpacity>

        {/* Services Section */}
        {/* <Text style={styles.sectionHeader}>Services</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              placeholderTextColor="#999"
              value={service.ServiceName}
              onChangeText={(text) => {
                const updatedServices = [...services];
                updatedServices[index] = {
                  ...updatedServices[index],
                  ServiceName: text,
                };
                setServices(updatedServices);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#999"
              value={service.Rate}
              keyboardType="numeric"
              onChangeText={(text) => {
                const updatedServices = [...services];
                updatedServices[index] = {
                  ...updatedServices[index],
                  Rate: text,
                };
                setServices(updatedServices);
              }}
            />
            <TouchableOpacity
              onPress={() =>
                setServices(services.filter((_, i) => i !== index))
              }
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            setServices([
              ...services,
              {
                ServiceName: "",
                Rate: "",
                shopId: "",
              },
            ])
          }
        >
          <Text style={styles.addButtonText}>+ Add Service</Text>
        </TouchableOpacity> */}
        {/* Services Section */}
        <Text style={styles.sectionHeader}>Services</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              placeholderTextColor="#999"
              value={service.ServiceName}
              onChangeText={(text) => {
                const updatedServices = [...services];
                updatedServices[index] = {
                  ...updatedServices[index],
                  ServiceName: text,
                };
                setServices(updatedServices);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#999"
              value={service.Rate}
              keyboardType="numeric"
              onChangeText={(text) => {
                const updatedServices = [...services];
                updatedServices[index] = {
                  ...updatedServices[index],
                  Rate: text,
                };
                setServices(updatedServices);
              }}
            />
            <TouchableOpacity
              onPress={() =>
                setServices(services.filter((_, i) => i !== index))
              }
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>+ Add Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    backgroundColor: "#222",
    padding: 15,
    alignItems: "center",
    paddingTop: 50,
  },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  scrollContainer: { padding: 16 },
  sectionHeader: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  input: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#fff", fontSize: 14 },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default RegisterScreen;
