// import React from "react";
// import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";

// const bookings = [
//   {
//     id: "1",
//     userName: "John Doe",
//     timing: "10:00 AM - 11:00 AM",
//     location: "Downtown Salon",
//     paid: true,
//   },
//   {
//     id: "2",
//     userName: "Jane Smith",
//     timing: "11:30 AM - 12:30 PM",
//     location: "City Center",
//     paid: false,
//   },
//   {
//     id: "3",
//     userName: "Bob Johnson",
//     timing: "1:00 PM - 2:00 PM",
//     location: "Uptown Salon",
//     paid: true,
//   },
// ];

// export default function ShopOwnerHome() {
//   const handleAccept = (id: string) => {
//     console.log(`Accepted booking with ID: ${id}`);
//     // Add logic to update the booking status
//   };

//   const handleDecline = (id: string) => {
//     console.log(`Declined booking with ID: ${id}`);
//     // Add logic to update the booking status
//   };

//   const renderBooking = ({ item }: { item: typeof bookings[0] }) => {
//     return (
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{item.userName}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Timing:</Text>
//           <Text style={styles.value}>{item.timing}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Location:</Text>
//           <Text style={styles.value}>{item.location}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Payment:</Text>
//           <Text
//             style={[styles.paymentStatus, { color: item.paid ? "green" : "red" }]}
//           >
//             {item.paid ? "Paid" : "Not Paid"}
//           </Text>
//         </View>
//         <View style={styles.actions}>
//           <TouchableOpacity
//             style={[styles.button, styles.acceptButton]}
//             onPress={() => handleAccept(item.id)}
//           >
//             <Text style={styles.buttonText}>Accept</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.declineButton]}
//             onPress={() => handleDecline(item.id)}
//           >
//             <Text style={styles.buttonText}>Decline</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>View Bookings</Text>
//       <FlatList
//         data={bookings}
//         keyExtractor={(item) => item.id}
//         renderItem={renderBooking}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1, // To ensure the container takes full height
//     backgroundColor:"whitesmoke"
//   },
//   title: {
//     marginTop:40,
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 20, // Add margin for spacing between title and list
//     textAlign: "center", // Center the title
//   },
//   listContainer: {
//     paddingBottom: 10, // Ensure there's padding at the bottom of the list
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#333",
//   },
//   value: {
//     fontSize: 16,
//     color: "#555",
//   },
//   paymentStatus: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//     alignItems: "center",
//   },
//   acceptButton: {
//     backgroundColor: "green",
//   },
//   declineButton: {
//     backgroundColor: "red",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
// });
import React, { useContext, useState } from "react";
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
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "react-native-paper";

const bookings = [
  {
    id: "1",
    userName: "John Doe",
    timing: "10:00 AM - 11:00 AM",
    location: "Downtown Salon",
    paid: true,
  },
  {
    id: "2",
    userName: "Jane Smith",
    timing: "11:30 AM - 12:30 PM",
    location: "City Center",
    paid: false,
  },
  {
    id: "3",
    userName: "Bob Johnson",
    timing: "1:00 PM - 2:00 PM",
    location: "Uptown Salon",
    paid: true,
  },
];

export default function ShopOwnerHome() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);

  const handleAccept = (id: string) =>
    console.log(`Accepted booking with ID: ${id}`);
  const handleDecline = (id: string) =>
    console.log(`Declined booking with ID: ${id}`);

  const renderBooking = ({ item }: { item: (typeof bookings)[0] }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.userName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Timing:</Text>
        <Text style={styles.value}>{item.timing}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{item.location}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Payment:</Text>
        <Text
          style={[styles.paymentStatus, { color: item.paid ? "green" : "red" }]}
        >
          {item.paid ? "Paid" : "Not Paid"}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.declineButton]}
          onPress={() => handleDecline(item.id)}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Avatar and Shop Owner Name (left), Title centered */}
      <View style={styles.header}>
        <View style={styles.ownerInfo}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.avatarContainer}
          >
            <Avatar.Icon size={40} icon="account" />
            <Text style={styles.shopOwnerName}>Shop Owner</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>View Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContainer}
      />

      {/* Right-side Drawer Modal */}
      <Modal transparent visible={isDrawerVisible} animationType="slide">
        <Pressable style={styles.overlay} onPress={toggleDrawer} />
        <View style={styles.drawer}>
          {/* Drawer Header - Avatar and Name */}
          <View style={styles.drawerHeader}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.drawerAvatar}
            />
            <Text style={styles.drawerOwnerName}>Shop Owner</Text>
          </View>

          {/* Drawer Menu Items */}
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerText}>Profile Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Text style={styles.drawerText}>Offers</Text>
          </TouchableOpacity>

          {/* Logout Button - Pinned to Bottom */}
          <View style={styles.drawerBottom}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  shopOwnerName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginRight: 50, // To offset the centered title (depends on content)
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  paymentStatus: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "green",
  },
  declineButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Drawer Styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  drawerOwnerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  drawerText: {
    fontSize: 16,
    color: "#333",
  },
  drawerBottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
