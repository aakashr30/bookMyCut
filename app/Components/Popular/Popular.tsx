import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import { fetchViewAllShop } from "@/app/api/shopOwnerApi/shopOnwer";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Popular() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const loadShops = async () => {
      try {
        const response = await fetchViewAllShop();

        if (response?.success && Array.isArray(response.data)) {
          // Filter only shop entries (entries that contain "ShopName")
          const shopData = response.data.filter((item) => item.ShopName);
          console.log(shopData, "shopDatashopData...");
          setShops(shopData);
          
          // Animate in the content
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }).start();
        } else {
          console.error("Invalid data format:", response);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);

  const ShopCard = ({ item, index }) => {
    const [cardAnimation] = useState(new Animated.Value(0));
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const onPressIn = () => {
      setPressed(true);
      Animated.timing(cardAnimation, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      setPressed(false);
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: cardAnimation,
            transform: [
              {
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
              {
                scale: cardAnimation,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.card}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => router.push("/screens/users/userBooking")}
          activeOpacity={0.9}
        >
          {/* Image Section */}
          <View style={styles.imageContainer}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.shopImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.shopImage, styles.placeholderImage]}>
                <View style={styles.placeholderIcon}>
                  <Text style={styles.placeholderIconText}>🏪</Text>
                </View>
                <Text style={styles.placeholderText}>No Image Available</Text>
              </View>
            )}
            
            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.gradientOverlay}
            />
            
            {/* Rating Badge */}
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {item.rating || "4.0"}</Text>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.cardContent}>
            <Text style={styles.shopName} numberOfLines={2}>
              {item.ShopName}
            </Text>
            
            {/* Additional Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>
                  {item.location || "Location not specified"}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>⏰</Text>
                <Text style={styles.infoText}>
                  {item.timing || "Open Now"}
                </Text>
              </View>
            </View>

            {/* Book Button */}
            <TouchableOpacity style={styles.bookButton}>
              <LinearGradient
                colors={['#1a1a1a', '#333333', '#000000']}
                style={styles.bookButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
                <Text style={styles.bookButtonIcon}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderShopCard = ({ item, index }) => (
    <ShopCard item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Popular Shops</Text>
        <Text style={styles.subtitle}>Discover the best shops near you</Text>
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading amazing shops...</Text>
        </View>
      ) : (
        <Animated.View
          style={[
            styles.listContainer,
            {
              opacity: animatedValue,
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <FlatList
            data={shops}
            horizontal
            renderItem={renderShopCard}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            snapToInterval={width * 0.8}
            decelerationRate="fast"
            snapToAlignment="center"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    fontWeight: '400',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#ffffff80',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: width * 0.75,
    marginRight: 15,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  shopImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  placeholderImage: {
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    backgroundColor: '#333333',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  placeholderIconText: {
    fontSize: 24,
  },
  placeholderText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardContent: {
    padding: 20,
  },
  shopName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 28,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#aaaaaa',
    fontWeight: '500',
    flex: 1,
  },
  bookButton: {
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
  bookButtonIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});