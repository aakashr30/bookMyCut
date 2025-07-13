import React, { useRef, useEffect, useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const offers = [
  {
    text: "Grab your deals now!",
    subtitle: "Limited time offer - Don't miss out",
    image: require("../../../assets/images/deal1.jpeg"),
    color: "#FF6B6B",
  },
  {
    text: "15% off on your first purchase!",
    subtitle: "New customers get exclusive discounts",
    image: require("../../../assets/images/deal2.avif"),
    color: "#4ECDC4",
  },
  {
    text: "Become a member and enjoy exclusive benefits!",
    subtitle: "Premium membership perks await",
    image: require("../../../assets/images/deal3.png"),
    color: "#45B7D1",
  },
];

const Banner = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-scroll functionality
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % offers.length;
      setCurrentIndex(index);
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  const renderOffer = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardImageContainer}>
          <Image source={item.image} style={styles.cardImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.cardOverlay}
          />
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{item.text}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          
          <TouchableOpacity style={styles.dealButton}>
            <LinearGradient
              colors={['#1a1a1a', '#333333']}
              style={styles.dealButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.dealButtonText}>Claim Deal</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#FFD700" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Decorative accent */}
        <View style={[styles.cardAccent, { backgroundColor: item.color }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.banner}>
      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.headerTitle}>Find Your Perfect Shop</Text>
        <Text style={styles.headerSubtitle}>Discover amazing deals and services</Text>
      </Animated.View>

      {/* Enhanced Search Bar */}
      <Animated.View
        style={[
          styles.searchbarWrapper,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[
          styles.searchInputContainer,
          searchFocused && styles.searchInputFocused
        ]}>
          <MaterialIcons
            name="search"
            size={24}
            color={searchFocused ? "#FFD700" : "#888"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite shop"
            placeholderTextColor="#888"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Deals Section Header */}
      <Animated.View
        style={[
          styles.dealsHeader,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.dealsTitle}>🔥 Hot Deals</Text>
        <View style={styles.dealCounter}>
          <Text style={styles.dealCounterText}>
            {currentIndex + 1} / {offers.length}
          </Text>
        </View>
      </Animated.View>

      {/* Offers Carousel */}
      <Animated.View
        style={[
          styles.offerContainer,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.FlatList
          ref={flatListRef}
          data={offers}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOffer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </Animated.View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {offers.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "transparent",
    paddingTop: 20,
    paddingBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#ffffff80",
    textAlign: "center",
    fontWeight: "400",
  },
  searchbarWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#333333",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  searchInputFocused: {
    borderColor: "#FFD700",
    elevation: 12,
    shadowColor: "#FFD700",
    shadowOpacity: 0.3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#333333",
    borderRadius: 8,
    marginLeft: 8,
  },
  dealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dealsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  dealCounter: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333333",
  },
  dealCounterText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  offerContainer: {
    marginBottom: 20,
  },
  cardContainer: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#333333",
    position: "relative",
  },
  cardImageContainer: {
    position: "relative",
    height: 180,
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  cardContent: {
    padding: 20,
    alignItems: "center",
  },
  cardText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 26,
  },
  cardSubtitle: {
    color: "#ffffff80",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  dealButton: {
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dealButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  dealButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333333",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFD700",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Banner;