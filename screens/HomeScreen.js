import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

export default function HomeScreen({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    jumbotron: {
      width: windowWidth,
      height: 200,
      flex: 2,
    },
    buttons: {
      flex: 4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
    },
    pil: {
      aspectRatio: 1.3,
      resizeMode: "contain",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/jumbotron.jpg")}
        style={styles.jumbotron}
      />
      <View style={styles.buttons}>
        <Image
          source={require("../assets/cukur-on-delivery-pil-edited.png")}
          style={styles.pil}
        />
        <Image
          source={require("../assets/cukur-on-barber-pil-edited.png")}
          style={styles.pil}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
