import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";
import Header from "../../components/Header";
import Colors from "../../constants/colors";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function OngoingOrder() {
  const socket = useContext(SocketContext)
  //PLEASE INSERT THIS FUNCTION ON A BUTTON
  const endTransaction = async (id) => {
    const access_token = await AsyncStorage.getItem("access_token");
    const data = await AsyncStorage.getItem("transaction_data");
    if (!data) ToastAndroid.show("Order not exist", 3000);
    else {
      axios({
        url: `https://tukangcukur.herokuapp.com/transaksi/${id}`,
        method: 'PATCH',
        headers: {
          access_token
        },
        data: {
          status: 'completed'
        }
      })
        .then(()=>{
          socket.broadcast.emit()
        })
        .catch(console.log)
    }
  }
  //PLEASE INSERT THIS FUNCTION ON A BUTTON

  const [transaction, setTransaction] = useState({
    CustomerId: 0,
    TukangCukurId: 0,
    status: "",
    Customer: {
      nama: "",
      alamat: "",
      telepon: "",
    },
    TukangCukur: {
      nama: "",
      telepon: "",
      urlPhoto:
        "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      rating: 0,
      latitude: 0,
      longitude: 0,
    },
    TransactionDetails: [],
  });
  const [cusLat, setCusLat] = useState(-7.563967);
  const [cusLong, setCusLong] = useState(110.854295);
  const [kangLat, setKangLat] = useState(-7.563967);
  const [kangLong, setKangLong] = useState(110.854295);

  const checkTransaction_data = useCallback(async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const data = await AsyncStorage.getItem("transaction_data");
    if (data) {
      const transac = JSON.parse(data);
      setTransaction(transac);

      setKangLat(transac.TukangCukur.latitude);
      setKangLong(transac.TukangCukur.longitude);

      setCusLat(transac.customerLatitude);
      setCusLong(transac.customerLongitude);
    } else {
      axios({
        url: "http://tukangcukur.herokuapp.com/transaksi/ongoing",
        method: "GET",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          setKangLat(data.TukangCukur.latitude);
          setKangLong(data.TukangCukur.longitude);

          setCusLat(data.customerLatitude);
          setCusLong(data.customerLongitude);

          setTransaction(data);
        })
        .catch(console.log);
    }
  });

  useEffect(() => {
    checkTransaction_data();
  }, []);

  if (!transaction) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <Header title="Maps" />
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled
          style={{ flex: 1 }}
          initialRegion={{
            latitude: cusLat,
            longitude: cusLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: kangLat, longitude: kangLong }}
            pinColor={"green"}
          />
        </MapView>
        <View style={styles.mapsText}>
          {!transaction && <ActivityIndicator />}
          {transaction && (
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Image
                    style={styles.fotoProfile}
                    source={{
                      uri:
                        "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                    }}
                  />
                  <View style={styles.text}>
                    <Text style={styles.title}>
                      {transaction.TukangCukur.nama}
                    </Text>
                    <Text style={styles.info}>
                      {transaction.TukangCukur.telepon}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 30,
                      flexDirection: "row",
                      alignContent: "center",
                    }}
                  >
                    <Text style={styles.textLink}>
                      <Fontisto name="star" size={20} color={Colors.cancelButton} />
                      {String(transaction.TukangCukur.rating).length === 1 ? String(transaction.TukangCukur.rating) + ".0" : transaction.TukangCukur.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapsText: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    color: Colors.color1,
    width: width * 0.95,
    alignSelf: "center",
    height: height * 0.15,
    position: "absolute",
    bottom: height * 0.05,
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  textLink: {
    fontWeight: "bold",
    color: Colors.accent,
    fontSize: 25,
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.base1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  info: {
    fontSize: 15,
  },
  rating: {
    fontSize: 18,
    marginLeft: 10,
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: "row",
  },
});
