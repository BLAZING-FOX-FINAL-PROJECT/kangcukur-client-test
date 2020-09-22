import React, {useState, useEffect, useCallback } from "react";
import { Text, View, AsyncStorage, ActivityIndicator , StyleSheet, Dimensions} from "react-native";
import axios from "axios"
import Header from '../../components/Header';
import Colors from '../../constants/colors';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'

const { width, height } = Dimensions.get('window')


export default function OngoingOrder() {
const [transaction, setTransaction] = useState({})
const [cusLat, setCusLat] = useState(-7.563967)
const [cusLong, setCusLong] = useState(110.854295)
const [kangLat, setKangLat] = useState(-7.563967)
const [kangLong, setKangLong] = useState(110.854295)

  const checkTransaction_data = useCallback(async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const data = await AsyncStorage.getItem("transaction_data");
    if (data) {
      const transac = JSON.parse(data)
      setTransaction(transac)

      setKangLat(transac.TukangCukur.latitude)
      setKangLong(transac.TukangCukur.longitude)

      setCusLat(transac.customerLatitude)
      setCusLong(transac.customerLongitude)
    } else {
      axios({
        url: "http://tukangcukur.herokuapp.com/transaksi/ongoing",
        method: "GET",
        headers: {
          access_token
        }
      })
      .then(({data})=>{
        setKangLat(data.TukangCukur.latitude)
        setKangLong(data.TukangCukur.longitude)

        setCusLat(data.customerLatitude)
        setCusLong(data.customerLongitude)

        setTransaction(data)
      })
      .catch(console.log)
    }
  });

  useEffect(() => {
    checkTransaction_data();
  }, []);

    return (
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{ flex : 1}}
          initialRegion = {{
            latitude: cusLat,
            longitude: cusLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Header title="Maps" />
          <Marker
            coordinate={{ latitude:kangLat, longitude:kangLong }}
            pinColor={"green"}
          />
          <View
            style={styles.mapsText}>
            <Text style={{ fontWeight: 'bold' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            <Text style={{ fontWeight: 'bold' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          </View>
        </MapView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapsText: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    color: Colors.color1,
    width: width * 0.95,
    alignSelf: 'center',
    height: height * 0.15,
    position: 'absolute',
    bottom: height * 0.05
  }
});
