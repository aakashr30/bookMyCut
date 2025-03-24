import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
// import { Toast } from "react-native-toast-message/lib/src/Toast";
import FlashMessage, { showMessage } from "react-native-flash-message";
interface Booking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  amount: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => (
  <View style={styles.statsCard}>
    <TouchableOpacity
      onPress={() =>
        showMessage({
          message: "Success!",
          description: "Your operation was successful.",
          type: "success",
        })
      }
    >
      <Text style={{ fontSize: 20, color: "black" }}>Show Flash Message</Text>
    </TouchableOpacity>

    <FlashMessage position="top" />

    <Text style={styles.statsTitle}>{title}</Text>
    <Text style={styles.statsValue}>{value}</Text>
  </View>
);

interface PastBookingCardProps {
  customerName: string;
  service: string;
  date: string;
  amount: number;
}

const PastBookingCard: React.FC<PastBookingCardProps> = ({
  customerName,
  service,
  date,
  amount,
}) => (
  <View style={styles.pastBookingCard}>
    <Text style={styles.bookingText}>
      <Text style={styles.bookingLabel}>Customer:</Text> {customerName}
    </Text>
    <Text style={styles.bookingText}>
      <Text style={styles.bookingLabel}>Service:</Text> {service}
    </Text>
    <Text style={styles.bookingText}>
      <Text style={styles.bookingLabel}>Date:</Text> {date}
    </Text>
    <Text style={styles.bookingText}>
      <Text style={styles.bookingLabel}>Amount:</Text> ${amount}
    </Text>
  </View>
);

const ShopOwnerScreen: React.FC = () => {
  const stats = {
    monthlyBookings: 25,
    yearlyBookings: 300,
    completedHaircuts: 220,
    totalEarnings: 15000,
  };

  const pastBookings: Booking[] = [
    {
      id: "1",
      customerName: "John Doe",
      service: "Haircut",
      date: "Jan 2, 2025",
      amount: 50,
    },
    {
      id: "2",
      customerName: "Jane Smith",
      service: "Shave",
      date: "Jan 3, 2025",
      amount: 30,
    },
    {
      id: "3",
      customerName: "Mike Brown",
      service: "Haircut + Beard Trim",
      date: "Jan 4, 2025",
      amount: 70,
    },
    {
      id: "4",
      customerName: "Emily Davis",
      service: "Haircut",
      date: "Jan 5, 2025",
      amount: 50,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop Owner Dashboard</Text>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <StatsCard title="Bookings This Month" value={stats.monthlyBookings} />
        <StatsCard title="Bookings This Year" value={stats.yearlyBookings} />
        <StatsCard title="Haircuts Completed" value={stats.completedHaircuts} />
        <StatsCard title="Total Earnings" value={`$${stats.totalEarnings}`} />
      </View>

      {/* Past Bookings Section */}
      <Text style={styles.sectionHeader}>Past Bookings</Text>
      <FlatList
        data={pastBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PastBookingCard
            customerName={item.customerName}
            service={item.service}
            date={item.date}
            amount={item.amount}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 10,
  },
  statsTitle: {
    fontSize: 16,
    color: "#555",
  },
  statsValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  pastBookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bookingText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  bookingLabel: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default ShopOwnerScreen;

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
// import * as FileSystem from "expo-file-system";

// interface Booking {
//   id: string;
//   customerName: string;
//   service: string;
//   date: string;
//   amount: number;
// }

// const ShopOwnerScreen: React.FC = () => {
//   const stats = {
//     monthlyBookings: 25,
//     yearlyBookings: 300,
//     completedHaircuts: 220,
//     totalEarnings: 15000,
//   };

//   const pastBookings: Booking[] = [
//     { id: "1", customerName: "John Doe", service: "Haircut", date: "Jan 2, 2025", amount: 50 },
//     { id: "2", customerName: "Jane Smith", service: "Shave", date: "Jan 3, 2025", amount: 30 },
//     { id: "3", customerName: "Mike Brown", service: "Haircut + Beard Trim", date: "Jan 4, 2025", amount: 70 },
//     { id: "4", customerName: "Emily Davis", service: "Haircut", date: "Jan 5, 2025", amount: 50 },
//   ];

//   const generatePDF = async () => {
//     try {
//       const htmlContent = `
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial, sans-serif; }
//               h1 { text-align: center; }
//               table {
//                 width: 100%;
//                 border-collapse: collapse;
//                 margin: 20px 0;
//               }
//               th, td {
//                 border: 1px solid #ddd;
//                 padding: 8px;
//                 text-align: left;
//               }
//               th { background-color: #f4f4f4; }
//             </style>
//           </head>
//           <body>
//             <h1>Shop Owner Booking Statement</h1>
//             <p><strong>Bookings This Month:</strong> ${stats.monthlyBookings}</p>
//             <p><strong>Bookings This Year:</strong> ${stats.yearlyBookings}</p>
//             <p><strong>Haircuts Completed:</strong> ${stats.completedHaircuts}</p>
//             <p><strong>Total Earnings:</strong> $${stats.totalEarnings}</p>
//             <h2>Past Bookings</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Customer</th>
//                   <th>Service</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${pastBookings
//                   .map(
//                     (booking) => `
//                   <tr>
//                     <td>${booking.customerName}</td>
//                     <td>${booking.service}</td>
//                     <td>${booking.date}</td>
//                     <td>$${booking.amount}</td>
//                   </tr>
//                 `
//                   )
//                   .join("")}
//               </tbody>
//             </table>
//           </body>
//         </html>
//       `;

//       const file = await RNHTMLtoPDF.convert({
//         html: htmlContent,
//         fileName: "ShopOwnerStatement",
//         base64: true,
//       });

//       Alert.alert("Success", "PDF generated successfully!");
//       console.log("PDF File:", file.filePath);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       Alert.alert("Error", "Could not generate PDF. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Shop Owner Dashboard</Text>

//       {/* Stats Section */}
//       <View style={styles.statsSection}>
//         <Text style={styles.stats}>Bookings This Month: {stats.monthlyBookings}</Text>
//         <Text style={styles.stats}>Bookings This Year: {stats.yearlyBookings}</Text>
//         <Text style={styles.stats}>Completed Haircuts: {stats.completedHaircuts}</Text>
//         <Text style={styles.stats}>Total Earnings: ${stats.totalEarnings}</Text>
//       </View>

//       {/* Past Bookings Section */}
//       <Text style={styles.sectionHeader}>Past Bookings</Text>
//       <FlatList
//         data={pastBookings}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.bookingCard}>
//             <Text style={styles.bookingText}>Customer: {item.customerName}</Text>
//             <Text style={styles.bookingText}>Service: {item.service}</Text>
//             <Text style={styles.bookingText}>Date: {item.date}</Text>
//             <Text style={styles.bookingText}>Amount: ${item.amount}</Text>
//           </View>
//         )}
//       />

//       {/* Download Button */}
//       <TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
//         <Text style={styles.downloadButtonText}>Download Statement</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   statsSection: {
//     marginBottom: 20,
//   },
//   stats: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   bookingCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   bookingText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   downloadButton: {
//     backgroundColor: "#007BFF",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   downloadButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default ShopOwnerScreen;
