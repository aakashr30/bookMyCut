import React, { useState } from "react";
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
import { fetchUserRegister } from "../api/userApi/userApi";
import Toast from "react-native-toast-message";

// Define form data type
type FormData = {
  firstName: string;
  lastName: string;
  city: string;
  pincode: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
};

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const UserLoginRegisterForm = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmittedData(data); // Store submitted data
    console.log("Form Submitted:", data); // Debugging

    try {
      const response = await fetchUserRegister(data);
      if (response) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Registration successful",
        });
        reset();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Title */}
        <Text style={styles.title}>Please Register</Text>

        {(
          [
            {
              name: "firstName" as const,
              label: "First Name",
              placeholder: "Enter First Name",
            },
            {
              name: "lastName" as const,
              label: "Last Name",
              placeholder: "Enter Last Name",
            },
            { name: "city" as const, label: "City", placeholder: "Enter City" },
            {
              name: "pincode" as const,
              label: "Pincode",
              placeholder: "Enter Pincode",
              keyboardType: "numeric",
            },
            {
              name: "mobileNumber" as const,
              label: "Mobile Number",
              placeholder: "Enter Mobile Number",
              keyboardType: "phone-pad",
            },
            {
              name: "password" as const,
              label: "Password",
              placeholder: "Enter Password",
              secureTextEntry: true,
            },
            {
              name: "confirmPassword" as const,
              label: "Confirm Password",
              placeholder: "Confirm Password",
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
                  //   keyboardType={field.keyboardType}
                  //   secureTextEntry={field.secureTextEntry}
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

        {/* Display Submitted Data */}
        {submittedData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Submitted Data:</Text>
            <Text style={styles.resultText}>
              {JSON.stringify(submittedData, null, 2)}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { color: "#fff", marginBottom: 4, fontSize: 16, fontWeight: "bold" },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  resultContainer: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  resultTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  resultText: { color: "#fff", marginTop: 5 },
});

export default UserLoginRegisterForm;
