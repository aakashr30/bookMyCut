import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const Cards = () => {
  const [selectedGender, setSelectedGender] = useState("male");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

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
    // Initial animation
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isSliding) {
      intervalRef.current = setInterval(() => {
        // Fade out current image
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          // Change image
          setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingHaircuts.length);
          // Fade in new image
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }, 2500);
    }

    return () => clearInterval(intervalRef.current);
  }, [isSliding, trendingHaircuts]);

  const handleGenderClick = (gender) => {
    // Scale animation for button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedGender(gender);
    setCurrentIndex(0);
    setIsSliding(true);
    
    // Reset and animate the trending image
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const GenderButton = ({ gender, image, label, onPress }) => {
    const isSelected = selectedGender === gender;
    
    return (
      <TouchableOpacity
        style={[
          styles.photoContainer,
          isSelected && styles.selectedContainer
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.photoWrapper,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={[styles.photoFrame, isSelected && styles.selectedFrame]}>
            <Image source={image} style={styles.photo} />
            {isSelected && (
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.3)', 'transparent']}
                style={styles.selectedOverlay}
              />
            )}
          </View>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {label}
            </Text>
            {isSelected && <View style={styles.selectedIndicator} />}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          {
            opacity: slideAnim,
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
        <Text style={styles.title}>Choose Your Style</Text>
        <Text style={styles.subtitle}>Select gender to explore trending haircuts</Text>
      </Animated.View>

      {/* Gender Selection Section */}
      <Animated.View
        style={[
          styles.topSection,
          {
            opacity: slideAnim,
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
        <GenderButton
          gender="male"
          image={require("../../../assets/images/male_photo.jpg")}
          label="Male"
          onPress={() => handleGenderClick("male")}
        />
        
        <GenderButton
          gender="female"
          image={require("../../../assets/images/female_photo.png")}
          label="Female"
          onPress={() => handleGenderClick("female")}
        />
      </Animated.View>

      {/* Trending Haircuts Section */}
      <Animated.View
        style={[
          styles.trendingSection,
          {
            opacity: slideAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.trendingHeader}>
          <Text style={styles.trendingTitle}>
            Trending {selectedGender === "male" ? "Men's" : "Women's"} Styles
          </Text>
          <View style={styles.slideIndicator}>
            <Text style={styles.slideText}>
              {currentIndex + 1} / {trendingHaircuts.length}
            </Text>
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Animated.View
            style={[
              styles.trendingImageContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={trendingHaircuts[currentIndex]}
              style={styles.trendingPhoto}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.trendingOverlay}
            />
            <View style={styles.trendingInfo}>
              <Text style={styles.trendingLabel}>Style #{currentIndex + 1}</Text>
              <Text style={styles.trendingDescription}>
                {selectedGender === "male" ? "Modern Men's Cut" : "Elegant Women's Style"}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {trendingHaircuts.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    fontWeight: '400',
    lineHeight: 22,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedContainer: {
    transform: [{ scale: 1.05 }],
  },
  photoWrapper: {
    alignItems: 'center',
  },
  photoFrame: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333333',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  selectedFrame: {
    borderColor: '#FFD700',
    borderWidth: 3,
    elevation: 12,
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
  },
  photo: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 16,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  labelContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  selectedLabel: {
    color: '#FFD700',
    fontSize: 20,
  },
  selectedIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
  },
  trendingSection: {
    flex: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  trendingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  slideIndicator: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  slideText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  trendingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trendingImageContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  trendingPhoto: {
    width: width * 0.9,
    height: height * 0.35,
    borderRadius: 20,
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  trendingInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  trendingLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  trendingDescription: {
    fontSize: 14,
    color: '#ffffff80',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFD700',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Cards;