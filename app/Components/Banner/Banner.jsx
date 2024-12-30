import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import missing MaterialIcons

const { width } = Dimensions.get("window");

const offers = [
  {
    text: "Grab your deals now!",
    image: require("../../../assets/images/deal1.jpeg"),
  },
  {
    text: "15% off on your first purchase!",
    image: require("../../../assets/images/deal2.avif"),
  },
  {
    text: "Become a member and enjoy exclusive benefits!",
    image: require("../../../assets/images/deal3.png"),
  },
];

const Banner = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % offers.length;
      flatListRef.current.scrollToIndex({ index, animated: true });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderOffer = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.banner}>
      <View style={styles.searchbarWrapper}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite shop"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={offers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOffer}
        style={styles.offerContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "black",
    height: 400,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  searchbarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the search bar if needed
    width: "100%", // Set the full width of the container
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "90%", // Adjusted for wider search input
    backgroundColor: "black", // Background color to make it stand out
    borderWidth: 1,
    borderColor: "gray", // Border color
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "black",
    color: "black",
  },
  searchIcon: {
    marginRight: 10, // Space between the icon and input text
  },
  offerContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFF5E1",
    borderRadius: 10,
    width: width * 0.9, // Ensure cards have consistent width
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: (width * 0.05) / 2, // Equal spacing on either side
    paddingVertical: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    bottom: 20,
  },
  cardImage: {
    width: "80%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Banner;
