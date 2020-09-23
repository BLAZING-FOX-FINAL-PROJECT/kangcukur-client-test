import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import OngoingOrder from "../screens/Order/OngoingOrder"

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="OngoingOrder"
      component={OngoingOrder}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="KangcukurHome"
      component={KangcukurHome}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="VarianCukur"
      component={VarianCukur}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
  )
}

export { OrderStackNavigator };
