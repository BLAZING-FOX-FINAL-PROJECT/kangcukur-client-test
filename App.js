import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import * as Permissions from "expo-permissions";

import { HomeStackNavigator } from "./navigation/HomeStackNavigator";
import { ProfileStackNavigator } from "./navigation/ProfileStackNavigator";
import { OrderStackNavigator } from "./navigation/OrderStackNavigator";
import HistoryOrder from "./screens/History/HistoryOrder";
import OngoingOrder from "./screens/Order/OngoingOrder";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    // console.log(status, "status");
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
      // console.log(response, "respone");
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "md-home";
            } else if (route.name === "Order") {
              iconName = "md-list";
            } else if (route.name === "History") {
              iconName = "md-time";
            } else if (route.name === "Profile") {
              iconName = "md-contact";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Order" component={OrderStackNavigator} />
        <Tab.Screen name="History" component={HistoryOrder} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
