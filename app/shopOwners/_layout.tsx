import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayouts() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="shopOwnerHome"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <IconSymbol size={20} name="house.fill" color="white" />
          ),
        }}
      />
      {/* Booking Tab */}
      <Tabs.Screen
        name="shopOwnersbooking"
        options={{
          title: "Booking",
          tabBarIcon: () => (
            <IconSymbol size={30} name="calendar" color="white" />
          ),
        }}
      />
      {/* Register Tab */}
      <Tabs.Screen
        name="shopOwnerRegister"
        options={{
          title: "Register",
          tabBarIcon: () => (
            <IconSymbol size={24} name="person.crop.circle.badge.plus" color="white" />
          ),
        }}
      />
    </Tabs>
  );
}
