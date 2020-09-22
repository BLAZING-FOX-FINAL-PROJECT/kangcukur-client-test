import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Colors from "../constants/colors";

export default function VarianList({ item, addCukurVarian, reduceCukurVarian }) {
  const [jumlah, setJumlah] = useState(0);
  const addJumlah = () => {
    setJumlah(jumlah + 1);
    addCukurVarian(item)
  };
  const minJumlah = () => {
    if (jumlah > 0) {
      setJumlah(jumlah - 1);
      reduceCukurVarian(item)
    }
  };

  return (
    <View style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}>
      <View style={{ flexDirection: "column", flex: 4 }}>
        <Text style={{ color: Colors.color1}}>{item.jenisCukur}</Text>
        <Text>Rp. {item.hargaCukur}</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 2 }}>
        <Text>Jumlah</Text>
        <Text>{jumlah}</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 2 }}>
        <Text style={{ justifyContent: "center" }}></Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={addJumlah}>
            <FontAwesome name={"plus-circle"} size={35} color={Colors.color1} />
          </TouchableOpacity>
          {jumlah !== 0 && (
            <TouchableOpacity onPress={minJumlah}>
              <FontAwesome
                name={"minus-circle"}
                size={35}
                color={Colors.color1}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
