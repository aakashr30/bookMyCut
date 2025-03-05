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
  fetchaddServices,
} from "../api/shopOwnerApi/shopOnwer";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for delete icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

interface Barber {
  name: string;
  city: string;
}

interface Service {
  service: string;
  price: string;
}

interface Shop {
  name: string;
  address: string;
}

const RegisterScreen: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([{ name: "", city: "" }]);
  const [services, setServices] = useState<Service[]>([
    { service: "", price: "" },
  ]);
  const [timings, setTimings] = useState<string[]>([""]);
  const [shop, setShop] = useState<Shop>({ name: "", address: "" });
  const { isLoading, userToken, userType } = useContext(AuthContext);

  useEffect(() => {
    const viewAllShop = async () => {
      const data = await fetchViewAllShop();
      if (data && data.data.length > 0) {
        const firstShop = data.data[0]; // Assuming we fetch the first shop
        setShop({
          name: firstShop.ShopName || "",
          address: firstShop.ShopAddress || "",
        });
        setTimings(firstShop.timings || [""]);
      }
    };
    viewAllShop();
  }, []);

  const handleShopChange = (text: string, field: keyof Shop) => {
    setShop({ ...shop, [field]: text });
  };

  const handleBarberChange = (
    text: string,
    index: number,
    field: keyof Barber
  ) => {
    const updatedBarbers = [...barbers];
    updatedBarbers[index][field] = text;
    setBarbers(updatedBarbers);
  };

  const handleServiceChange = (
    text: string,
    index: number,
    field: keyof Service
  ) => {
    const updatedServices = [...services];
    updatedServices[index][field] = text;
    setServices(updatedServices);
  };

  // const handleAddBarber = async () => {
  //   try {
  //     // Retrieve the auth token from AsyncStorage
  //     const token = userToken;
  //     console.log(token, "tokentoken");

  //     // Check if the token exists
  //     if (!token) {
  //       Alert.alert("Error", "Authentication token is missing.");
  //       return;
  //     }

  //     // If token exists, prepare new barber data
  //     const newBarber = { name: "New Barber", city: "Unknown City" };

  //     // Update UI immediately
  //     setBarbers((prevBarbers) => [...prevBarbers, newBarber]);

  //     // Call API to add barber
  //     const response = await fetchAddBarbers(newBarber, userToken);

  //     // Handle the response
  //     if (response?.success) {
  //       Alert.alert("Success", "Barber added successfully!");
  //     } else {
  //       console.error("Failed to add barber:", response?.message);
  //       Alert.alert("Error", response?.message || "Failed to add barber.");
  //     }
  //   } catch (error) {
  //     console.error("Error adding barber:", error);
  //     Alert.alert("Error", "Something went wrong while adding barber.");
  //   }
  // };
  const handleAddBarber = async () => {
    try {
      // Retrieve the auth token from AsyncStorage
      const token = userToken;
      console.log(token, "tokentoken");

      // Check if the token exists
      if (!token) {
        Alert.alert("Error", "Authentication token is missing.");
        return;
      }

      // Loop through the barbers and prepare FormData for each barber
      for (let i = 0; i < barbers.length; i++) {
        const barber = barbers[i];
        const formData = new FormData();

        // Append barber data to FormData
        formData.append("name", barber.name);
        formData.append("city", barber.city);

        // Assuming the API accepts FormData for adding barbers
        const response = await fetchAddBarbers(formData, userToken);

        // Handle the response
        if (response?.success) {
          Alert.alert("Success", "Barber added successfully!");
        } else {
          console.error("Failed to add barber:", response?.message);
          Alert.alert("Error", response?.message || "Failed to add barber.");
        }
      }
    } catch (error) {
      console.error("Error adding barber:", error);
      Alert.alert("Error", "Something went wrong while adding barber.");
    }
  };

  const handleAddService = async () => {
    try {
      // Retrieve the auth token from AsyncStorage (or use userToken if it's already available)
      const token = userToken;
      console.log(token, "tokentoken");

      // Check if the token exists
      if (!token) {
        Alert.alert("Error", "Authentication token is missing.");
        return;
      }

      // Loop through the services and prepare each service for API call
      for (let i = 0; i < services.length; i++) {
        const service = services[i];

        // Prepare service data
        const serviceData = {
          name: service.service,
          price: service.price,
        };

        // Call the API to add service
        const response = await fetchaddServices(serviceData, token);

        // Handle the response
        if (response?.success) {
          Alert.alert("Success", "Service added successfully!");
        } else {
          console.error("Failed to add service:", response?.message);
          Alert.alert("Error", response?.message || "Failed to add service.");
        }
      }
    } catch (error) {
      console.error("Error adding service:", error);
      Alert.alert("Error", "Something went wrong while adding the service.");
    }
  };

  const handleSubmit = async () => {
    const requestData = { shop, barbers, services, timings };

    try {
      const response = await fetchAddShop(requestData);
      if (response.success) {
        Alert.alert("Success", "Shop registered successfully!");

        // Reset Form
        setShop({ name: "", address: "" });
        setBarbers([{ name: "", city: "" }]);
        setServices([{ service: "", price: "" }]);
        setTimings([""]);
      } else {
        Alert.alert("Error", response.message || "Failed to register shop.");
      }
    } catch (error) {
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

        <Text style={styles.sectionHeader}>Timings</Text>
        {timings.map((time, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="Shop Timing"
            placeholderTextColor="#999"
            value={time}
            onChangeText={(text) => {
              const updatedTimings = [...timings];
              updatedTimings[index] = text;
              setTimings(updatedTimings);
            }}
          />
        ))}

        <Text style={styles.sectionHeader}>Barbers</Text>
        {barbers.map((barber, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Barber Name"
              placeholderTextColor="#999"
              value={barber.name}
              onChangeText={(text) => handleBarberChange(text, index, "name")}
            />
            <TextInput
              style={styles.input}
              placeholder="Barber City"
              placeholderTextColor="#999"
              value={barber.city}
              onChangeText={(text) => handleBarberChange(text, index, "city")}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              // Add delete functionality if needed
            >
              <Ionicons name="trash" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddBarber}>
          <Text style={styles.addButtonText}>+ Add Barber</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Services</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              placeholderTextColor="#999"
              value={service.service}
              onChangeText={(text) =>
                handleServiceChange(text, index, "service")
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#999"
              value={service.price}
              keyboardType="numeric"
              onChangeText={(text) => handleServiceChange(text, index, "price")}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>+ Add Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
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
  },
  submitButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
