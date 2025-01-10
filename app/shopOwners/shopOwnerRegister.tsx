// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   GestureResponderEvent,
// } from "react-native";

// interface ShopOwnerCardProps {
//   name: string;
//   businessName: string;
//   location: string;
//   onPress: (event: GestureResponderEvent) => void;
// }

// const ShopOwnerCard: React.FC<ShopOwnerCardProps> = ({
//   name,
//   businessName,
//   location,
//   onPress,
// }) => {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Text style={styles.cardTitle}>{name}</Text>
//       <Text style={styles.cardSubtitle}>{businessName}</Text>
//       <Text style={styles.cardLocation}>{location}</Text>
//     </TouchableOpacity>
//   );
// };

// interface ShopOwner {
//   id: string;
//   name: string;
//   businessName: string;
//   location: string;
// }

// const ShopOwnerScreen: React.FC = () => {
//   const shopOwners: ShopOwner[] = [
//     { id: "1", name: "John Doe", businessName: "Doe's Barbershop", location: "New York, NY" },
//     { id: "2", name: "Jane Smith", businessName: "Jane's Salon", location: "Los Angeles, CA" },
//     { id: "3", name: "Michael Brown", businessName: "Michael's Cuts", location: "Chicago, IL" },
//     { id: "4", name: "Emily Davis", businessName: "Emily's Beauty Studio", location: "Houston, TX" },
//   ];

//   const handleCardPress = (name: string): void => {
//     alert(`You selected ${name}'s shop!`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Shop Owners</Text>
//       <FlatList
//         data={shopOwners}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ShopOwnerCard
//             name={item.name}
//             businessName={item.businessName}
//             location={item.location}
//             onPress={() => handleCardPress(item.name)}
//           />
//         )}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3, // For Android shadow
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 10,
//   },
//   cardLocation: {
//     fontSize: 14,
//     color: "#888",
//   },
// });

// export default ShopOwnerScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const RegisterScreen = () => {
  const [shopName, setShopName] = useState('');
  const [barberName, setBarberName] = useState('');
  const [timings, setTimings] = useState<string[]>(['']);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');

  const handleAddTiming = () => {
    setTimings([...timings, '']);
  };

  const handleTimingChange = (text: string, index: number) => {
    const updatedTimings = [...timings];
    updatedTimings[index] = text;
    setTimings(updatedTimings);
  };

  const handleSubmit = () => {
    const formData = {
      shopName,
      barberName,
      timings,
      phoneNumber,
      address,
      price,
      category: category === 'Other' ? otherCategory : category,
    };
    console.log('Form Data:', formData);
    // Add API call or further processing here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Shop Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        placeholderTextColor="#999"
        value={shopName}
        onChangeText={setShopName}
      />

      <Text style={styles.label}>Barber Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter barber name"
        placeholderTextColor="#999"
        value={barberName}
        onChangeText={setBarberName}
      />

      <Text style={styles.label}>Timings</Text>
      {timings.map((timing, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Enter timing ${index + 1}`}
          placeholderTextColor="#999"
          value={timing}
          onChangeText={(text) => handleTimingChange(text, index)}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTiming}>
        <Text style={styles.addButtonText}>+ Add Timing</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose category (Haircut, Shaving, Trimming, Other)"
        placeholderTextColor="#999"
        value={category}
        onChangeText={setCategory}
      />
      {category === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Specify other category"
          placeholderTextColor="#999"
          value={otherCategory}
          onChangeText={setOtherCategory}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black theme
    padding: 16,
  },
  label: {
    color: '#fff', // White text
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333', // Darker background for inputs
    color: '#fff', // White text
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;