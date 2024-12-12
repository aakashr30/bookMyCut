import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MdOutlineLocationSearching } from "react-icons/md";
import { FaUserCircle, FaScissors } from "react-icons/fa";

function Nav() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => setModalVisible(false);
  const handleOpen = () => setModalVisible(true);

  return (
    <View style={styles.navbar}>
      {/* Logo Section */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>Book My Cuts</Text>
      </View>

      {/* Location Input Section */}
      <View style={styles.location}>
        <TextInput
          style={styles.input}
          placeholder="Select your Location"
        />
        <TouchableOpacity style={styles.searchButton}>
          <MdOutlineLocationSearching />
        </TouchableOpacity>
      </View>

      {/* Style Selection */}
      <View style={styles.styleSelection}>
        <Text style={styles.dropdown}>Choose your Style</Text>
        <Text style={styles.option}>Male</Text>
        <Text style={styles.option}>Female</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleOpen}>
        <FaUserCircle /> <Text>Login</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Your Role</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.barberButton}>
              <Text>I am a Barber</Text> <FaScissors />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userButton}>
              <Text>Looking for a Barber</Text> <FaUserCircle />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Nav;

// Styles for React Native
const styles = StyleSheet.create({
  navbar: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  styleSelection: {
    marginBottom: 10,
  },
  dropdown: {
    fontWeight: 'bold',
  },
  option: {
    paddingVertical: 5,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  modalButtons: {
    width: '80%',
  },
  barberButton: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  userButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
});
