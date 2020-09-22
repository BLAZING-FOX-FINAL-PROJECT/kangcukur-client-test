import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View>
      <Text>PROFILE HOME</Text>
      <TouchableOpacity onPress={navigation.navigate("Login")}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
