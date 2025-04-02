import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { shopOwnerRegister } from "../../api/shopOwnerApi/shopOnwer";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
// Define form data type
interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  mobileNo: string;
  email: string;
  password: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  city: Yup.string().required("City is required"),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const ShopOwnerForm = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [shoperId, setShoperId] = useState("");
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      mobileNo: "",
      email: "",
      password: "",
      // shoperId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit triggered with data:", data);
    setSubmittedData(data);
    console.log("Form Submitted:", data);
    try {
      const response = await shopOwnerRegister(data);
      if (response) {
        showMessage({
          message: "Success!",
          description: "Your operation was successful.",
          type: "success",
        });
        reset();
        router.push("/logins/OwnerLogin");
      }
    } catch (error) {
      showMessage({
        message: "Error!",
        description: "Something went wrong.",
        type: "danger", // Correct type instead of "error"
      });
    }
    <FlashMessage position="top" />;
  };
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("Retrieved Token:", userToken);

        if (userToken && typeof userToken === "string") {
          const decoded = jwtDecode(userToken);
          console.log("Decoded Token:", decoded);
          setShoperId(decoded.id);
        } else {
          console.warn("No valid token found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchToken(); // Call the async function
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerText}>Please Fill Your Details</Text>
        </View>
        {(
          [
            {
              name: "firstName",
              label: "First Name",
              placeholder: "Enter First Name",
            },
            {
              name: "lastName",
              label: "Last Name",
              placeholder: "Enter Last Name",
            },
            { name: "city", label: "City", placeholder: "Enter City" },
            {
              name: "mobileNo",
              label: "Mobile Number",
              placeholder: "Enter Mobile Number",
              keyboardType: "phone-pad",
            },
            {
              name: "email",
              label: "Email",
              placeholder: "Enter Email",
              keyboardType: "email-address",
            },
            {
              name: "password",
              label: "Password",
              placeholder: "Enter Password",
              secureTextEntry: true,
            },
          ] as const
        ).map((field) => (
          <View key={field.name}>
            <Text style={styles.label}>{field.label}</Text>
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  // keyboardType={field.keyboardType || "default"}
                  // secureTextEntry={field.secureTextEntry || false}
                />
              )}
            />
            {errors[field.name] && (
              <Text style={styles.error}>{errors[field.name]?.message}</Text>
            )}
          </View>
        ))}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: { alignItems: "center", marginBottom: 20 },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  label: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#444",
  },
  error: { color: "#ff4d4d", fontSize: 14, marginBottom: 10 },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ShopOwnerForm;
