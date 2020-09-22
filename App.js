import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

import HomeScreen from "./screens/HomeScreen2";
import OrderScreen from "./screens/OrderScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

import MapsScreen from "./screens/MapsScreen"

const Tab = createBottomTabNavigator();

// import RootStackScreen from './screens/RootStackScreen'

export default function App() {
  return (
    <NavigationContainer>
      {/* <RootStackScreen /> */}
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Order" component={MapsScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
