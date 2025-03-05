import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "@/app/context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const [userName, setUserName] = useState("Guest");

  // Simulate API call to fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Simulating an API call delay
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({ data: { name: "John Doe" } }), 1000)
        );
        // setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, []);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View style={styles.navbar}>
      {/* Title */}
      <Text style={styles.title}>{`Hello ${userName}`}</Text>

      {/* New Search Input Box with Search Icon */}

      {/* Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[styles.icon, styles.iconWithBackground]}
          onPress={() => alert("Notification Clicked")}
        >
          <MaterialIcons name="notifications" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon, styles.iconWithBackground]}
          onPress={openModal}
        >
          <MaterialIcons name="person" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sliding Modal */}
      {modalVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  { transform: [{ translateX: slideAnim }] },
                ]}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.userIconContainer}>
                    <MaterialIcons name="person" size={28} color="black" />
                  </View>
                  <Text style={styles.modalHeaderText}>{userName}</Text>
                </View>

                {/* Modal Items */}
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalItemText}> Offers</Text>
                  {/* onPress={() => router.push("/logins/UserLoginRegisterForm")} */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalItemText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalItemText}>Accounts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalItemText}>Rewards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalItemText}>Setting</Text>
                </TouchableOpacity>

                {/* Logout at the Bottom */}
                <View style={styles.logoutContainer}>
                  <TouchableOpacity style={styles.modalItem} onPress={logout}>
                    <Text style={styles.modalItemText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  // New Search Input Box with Icon Inside
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    width: "40%", // Adjust width as needed
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
    borderRadius: 50,
    padding: 8,
  },
  iconWithBackground: {
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "black",
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  modalItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  modalItemText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  logoutContainer: {
    marginTop: "auto",
  },
});

export default Navbar;
