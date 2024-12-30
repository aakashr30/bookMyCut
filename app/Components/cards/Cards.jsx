import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Cards = () => {
  const [selectedGender, setSelectedGender] = useState("male");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const trendingMaleHaircuts = [
    require("../../../assets/images/male1.jpg"),
    require("../../../assets/images/male2.jpg"),
    require("../../../assets/images/male3.avif"),
  ];
  const trendingFemaleHaircuts = [
    require("../../../assets/images/female1.jpg"),
    require("../../../assets/images/female2.png"),
    require("../../../assets/images/female3.jpg"),
  ];

  const trendingHaircuts =
    selectedGender === "male" ? trendingMaleHaircuts : trendingFemaleHaircuts;

  const intervalRef = useRef();

  useEffect(() => {
    if (isSliding) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % trendingHaircuts.length
        );
      }, 1000);
    }

    return () => clearInterval(intervalRef.current); // Clear interval on component unmount or when sliding stops
  }, [isSliding, trendingHaircuts]);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setIsSliding(true); // Start sliding photos for the selected gender
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Select Gender</Text>

      {/* Top Section with Male and Female Photos */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => handleGenderClick("male")}
        >
          <Image
            source={require("../../../assets/images/male_photo.jpg")}
            style={styles.photo}
          />
          <Text style={styles.label}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => handleGenderClick("female")}
        >
          <Image
            source={require("../../../assets/images/female_photo.png")}
            style={styles.photo}
          />
          <Text style={styles.label}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section with Sliding Trending Haircuts */}
      <View style={styles.trendingContainer}>
        <Image
          source={trendingHaircuts[currentIndex]}
          style={styles.trendingPhoto}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "white",
    fontFamily: "cursive",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  photoContainer: {
    flex: 1,
    alignItems: "center",
  },
  photo: {
    width: width * 0.4, // 40% of screen width for each photo
    height: width * 0.4, // Keep the photo square
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gold", // Gold color for the text
    fontFamily: "cursive", // Funky font style
    textAlign: "center",
  },
  trendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  trendingPhoto: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.3, // 30% of screen height
    borderRadius: 10,
  },
});

export default Cards;
