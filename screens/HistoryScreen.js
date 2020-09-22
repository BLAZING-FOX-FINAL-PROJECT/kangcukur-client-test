import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import OrderCards from "../components/OrderCards";
// import DetailsCard from "../components/DetailsCard";
import Header from "../components/Header";
import Colors from "../constants/colors";

export default function OrderScreen({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const sample = [
    { name: "kang cukur 1", status: "completed", tanggal: "202020" },
    { name: "kang cukur 2", status: "canceled", tanggal: "212121" },
    { name: "kang cukur 3", status: "canceled", tanggal: "212121" },
    { name: "kang cukur 4", status: "completed", tanggal: "202020" },
    { name: "kang cukur 5", status: "canceled", tanggal: "212121" },
    { name: "kang cukur 6", status: "canceled", tanggal: "222222" },
    { name: "kang cukur 7", status: "completed", tanggal: "202020" },
  ];

  

  

  return (

    <View style={styles.container}>
      <View style={{ width: windowWidth, flex: 2 }}>
        <Header title="Order History" />
      </View>
      <View style={{ width: windowWidth, flex: 4, marginTop: -200 }}>
        <FlatList
          data={sample}
          renderItem={({ item, index }) => {
            return <OrderCards item={item} />;
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base1,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.color1,
    backgroundColor: Colors.base2,
  },
});
