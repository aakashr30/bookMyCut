import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
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
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="tabhome"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={20} name="house.fill" color={"black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabbooking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="plus.bubble.fill" color={"black"} /> // Increased size to 30
          ),
        }}
      />
      <Tabs.Screen
        name="mybooking"
        options={{
          title: "My Bookings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={20} name="chevron.right" color={"black"} />
          ),
        }}
      />
    </Tabs>
  );
}
