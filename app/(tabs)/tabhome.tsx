import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import Navbar from "../Components/Navbar/userNavbar";
import Banner from "../Components/Banner/Banner";
import Cards from "../Components/cards/Cards";
import Popular from "../Components/Popular/Popular";
import AuthContext from "../context/AuthContext";
const BookNow = () => {
  // const {token} = useContext(AuthContext);

  return (
    <View style={styles.outerContainer}>
      {/* Static Navbar */}
      <Navbar style={styles.navbar} />
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Banner style={styles.fullScreenComponent} />
          <Popular style={styles.fullScreenComponent} />
          <Cards style={styles.fullScreenComponent} />
          {/* Add your content here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  navbar: {
    height: 60, // Adjust to the correct height of your Navbar
    zIndex: 1, // Ensure it stays on top of other content
    position: "absolute", // Keeps it fixed at the top
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10, // Adjust the margin top to match your Navbar height
    paddingBottom: 20, // A small space at the bottom
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  fullScreenComponent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    color: "gold",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default BookNow;
