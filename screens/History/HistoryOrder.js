import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import HistoryCard from "../../components/HistoryCard"
// import DetailsCard from "../components/DetailsCard";
import Header from "../../components/Header";
import Colors from "../../constants/colors";

export default function HistoryOrder({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [completed, setCompleted] = useState(true)


  const sample = [
    { nama: "kang cukur 1", status: "completed", tanggal: "202020", rating:"4.5", customer: "customer 1", info:"Service Rambut" },
    { nama: "kang cukur 2", status: "canceled", tanggal: "212121", rating:"4.5", customer: "customer 2", info:"Service Rambut" },
    { nama: "kang cukur 3", status: "canceled", tanggal: "212121", rating:"4.5", customer: "customer 3", info:"Service Rambut" },
    { nama: "kang cukur 4", status: "completed", tanggal: "202020", rating:"4.5", customer: "customer 3", info:"Service Rambut" },
    { nama: "kang cukur 5", status: "canceled", tanggal: "212121", rating:"4.5", customer: "customer 4", info:"Service Rambut" },
    { nama: "kang cukur 6", status: "canceled", tanggal: "222222", rating:"4.5", customer: "customer 5", info:"Service Rambut" },
    { nama: "kang cukur 7", status: "completed", tanggal: "202020", rating: "4.5", customer: "customer 6", info: "Service Rambut" }
  ];

  let dataCompleted = sample.filter((e) => {
    return e.status === 'completed'
  })
  let dataCanceled = sample.filter((e) => {
    return e.status === 'canceled'
  })

  const canceledHandler = () => {
    setCompleted(false)
  }

  const completedHandler = () => {
    setCompleted(true)
  }


  return (

    <View style={styles.container}>
      <Header style={{flex:1}} title="Order History" />
      <View style={styles.btnHeaderContainer}>
        <TouchableOpacity
          style={completed ? styles.button : styles.buttonOutline}
          onPress={() => completedHandler()}
        >
          <Text style={completed ? styles.buttonText : styles.buttonTextOutline}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={completed ? styles.buttonOutline : styles.button}
          onPress={() => canceledHandler()}
        >
          <Text style={completed ?  styles.buttonTextOutline : styles.buttonText}>Canceled</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        
        <FlatList
          data={completed? dataCompleted : dataCanceled}
          renderItem={({ item, index }) => {
            return <HistoryCard item={item} index={index}/>;
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    
  },
  container: {
    backgroundColor: Colors.base1,
    alignItems: "center",
    color: Colors.color1,
    backgroundColor: Colors.base2,
    marginBottom: 240
  },
  button: {
    width: '50%',
    borderBottomWidth: 6,

    borderColor: Colors.accent,
    alignItems: "center",
    // backgroundColor: Colors.accent,
    padding: 10,
    // width: 120,
    // borderRadius: 20,
    // elevation: 8,
    // marginHorizontal:15
  },
  buttonOutline: {
    width: '50%',
    borderBottomWidth: 6,
    borderColor:Colors.base1,

    alignItems: "center",
    paddingVertical: 10,
    // width: 120,
    // borderRadius: 20,
    // marginTop: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.accent,
  },
  buttonTextOutline: {
    color: Colors.color1,

    // fontWeight: 'bold',

    fontSize: 18
  },
  listContainer: {
    width: '100%',
  }
});
