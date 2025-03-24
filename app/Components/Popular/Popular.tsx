// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from "react-native";

// const popularShops = [
//   {
//     id: "1",
//     name: "Shop One",
//     image:
//       "https://content.jdmagicbox.com/comp/kottayam/e7/9999px481.x481.140129041134.z7e7/catalogue/dronas-hair-style-kottayam-esi3d.jpg",
//     rating: 4.5,
//   },
//   {
//     id: "2",
//     name: "Shop Two",
//     image:
//       "https://content.jdmagicbox.com/comp/ernakulam/r8/0484px484.x484.230605112159.t8r8/catalogue/us7kpit7xgtcni9-js73d0rgui.jpg",
//     rating: 4.0,
//   },
//   {
//     id: "3",
//     name: "Shop Three",
//     image:
//       "https://content.jdmagicbox.com/comp/ernakulam/r8/0484px484.x484.230605112159.t8r8/catalogue/us7kpit7xgtcni9-js73d0rgui.jpg",
//     rating: 5.0,
//   },
//   {
//     id: "4",
//     name: "Shop Four",
//     image:
//       "https://content.jdmagicbox.com/comp/ernakulam/r8/0484px484.x484.230605112159.t8r8/catalogue/us7kpit7xgtcni9-js73d0rgui.jpg",
//     rating: 3.5,
//   },
//   {
//     id: "5",
//     name: "Shop Five",
//     image:
//       "https://content.jdmagicbox.com/comp/ernakulam/r8/0484px484.x484.230605112159.t8r8/catalogue/us7kpit7xgtcni9-js73d0rgui.jpg",
//     rating: 4.2,
//   },
// ];

// export default function Popular() {
//   const renderShopCard = ({ item }) => {
//     return (
//       <View style={styles.card}>
//         <Image
//           source={{ uri: item.image }} // Use uri for remote images
//           style={styles.shopImage}
//           resizeMode="cover" // Ensure the image fills the container without distortion
//         />
//         <View style={styles.overlay} />
//         <Text style={styles.shopName}>{item.name}</Text>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.rating}>⭐ {item.rating}</Text>
//         </View>
//         <TouchableOpacity style={styles.bookButton}>
//           <Text style={styles.bookButtonText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Popular Shops</Text>
//       <FlatList
//         data={popularShops}
//         horizontal
//         renderItem={renderShopCard}
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "white",
//   },
//   card: {
//     width: 220,
//     marginRight: 15,
//     backgroundColor: "white",
//     borderRadius: 20, // Increased border radius for premium look
//     elevation: 8, // Shadow for Android (increased for more depth)
//     shadowColor: "#000", // Shadow for iOS
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, // Increased shadow opacity for better effect
//     shadowRadius: 10,
//     overflow: "hidden",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   shopImage: {
//     width: "100%", // Full width of the card
//     height: 150, // Fixed height for images
//     borderTopLeftRadius: 20, // Rounded top corners for a smooth look
//     borderTopRightRadius: 20,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject, // Covers the entire card
//     backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black overlay
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   shopName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff", // White text for premium appearance
//     marginTop: 10,
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },
//   ratingContainer: {
//     marginVertical: 5,
//   },
//   rating: {
//     fontSize: 16,
//     color: "#f1c40f", // Gold color for the rating
//     textAlign: "center",
//   },
//   bookButton: {
//     backgroundColor: "#000",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 10, // Rounded button for a more premium look
//     marginBottom: 10,
//   },
//   bookButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchViewAllShop } from "@/app/api/shopOwnerApi/shopOnwer";
import { router } from "expo-router";

export default function Popular() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShops = async () => {
      try {
        const response = await fetchViewAllShop();

        if (response?.success && Array.isArray(response.data)) {
          // Filter only shop entries (entries that contain "ShopName")
          const shopData = response.data.filter((item) => item.ShopName);
          console.log(shopData, "shopDatashopData");
          setShops(shopData);
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

  const renderShopCard = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.shopImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.shopImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.overlay} />
      <Text style={styles.shopName}>{item.ShopName}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {item.rating || "4.0"}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push("/screens/users/userBooking")}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Shops</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={shops}
          horizontal
          renderItem={renderShopCard}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  card: {
    width: 220,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shopImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  placeholderImage: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  ratingContainer: {
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    color: "#f1c40f",
    textAlign: "center",
  },
  bookButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
