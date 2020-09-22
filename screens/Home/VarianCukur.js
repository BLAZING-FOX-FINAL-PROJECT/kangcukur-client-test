import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import { FontAwesome } from "react-native-vector-icons";
import axios from "axios";
import Colors from "../../constants/colors";
import VarianList from "../../components/VarianList";
// import { postTransactionCustom } from "../store/action/index";

export default function VarianCukur({ navigation }) {
  // const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [servis, setServis] = useState([]);
  const [customerLatitude, setCustomerLatitude] = useState(0);
  const [customerLongitude, setCustomerLongitude] = useState(0);

  useEffect(() => {
    const geoInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (latitude) {
            setCustomerLatitude(latitude);
          }
          if (longitude) {
            setCustomerLongitude(longitude);
          }
        },
        (error) => console.log("error getCurr:", error)
      );
    }, 3000);
    return () => {
      clearInterval(geoInterval);
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.base2,
      alignItems: "center",
      justifyContent: "center",
      color: Colors.color1,
    },
    form: {
      flex: 4,
      flexDirection: "column",
      marginTop: 30,
      backgroundColor: Colors.base1,
      width: (windowWidth * 95) / 100,
      height: (windowHeight * 90) / 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      padding: 15,
      elevation: 8,
    },
  });

  const sampleVarian = [
    {
      jenisCukur: "Potong rambut pria",
      hargaCukur: 60000,
    },
    {
      jenisCukur: "Potong rambut anak",
      hargaCukur: 30000,
    },
    {
      jenisCukur: "Potong jenggot dan kumis",
      hargaCukur: 25000,
    },
    {
      jenisCukur: "Creambath pria",
      hargaCukur: 50000,
    },
    {
      jenisCukur: "Gentleman massage",
      hargaCukur: 70000,
    },
    {
      jenisCukur: "Gentleman full package",
      hargaCukur: 200000,
    },
  ];

  const addServis = (item) => {
    if (
      servis.filter((el) => {
        return el.jenisCukur === item.jenisCukur;
      }).length
    ) {
      const addSameService = [...servis].map((el) => {
        if (el.jenisCukur === item.jenisCukur) {
          el.jumlah++;
        }
        return el;
      });
      // console.log(addSameService);
      setServis(addSameService);
    } else {
      setServis([...servis].concat({ ...item, jumlah: 1 }));
    }
  };

  const reduceServis = (item) => {
    let removeSameService;
    if (
      servis.filter((el) => {
        return el.jenisCukur === item.jenisCukur;
      }).length
    ) {
      removeSameService = [...servis].map((el) => {
        if (el.jenisCukur === item.jenisCukur) {
          el.jumlah--;
        }
        return el;
      });
    }
    const removeService = removeSameService.filter((el) => {
      return el.jumlah !== 0;
    });
    setServis(removeService);
  };

  const postCukurNow = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!customerLatitude || !customerLongitude || !servis.length) {
      ToastAndroid.show("Please pick a service.. ", 3000);
    } else {
      axios({
        url: "https://tukangcukur.herokuapp.com/transaksi",
        method: "POST",
        headers: {
          access_token,
        },
        data: {
          customerLatitude,
          customerLongitude,
          servis,
        },
      })
        .then(async ({ data }) => {
          try {
            if (data.message === "Internal server error") {
              ToastAndroid.show("We cant find kangcukur yet...", 3000);
            } else {
              await AsyncStorage.setItem(
                "transaction_data",
                JSON.stringify(data)
              );
              navigation.navigate("Order");
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            backgroundColor: Colors.accent,
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 2,
            width: "100%",
            borderRadius: 5,
            elevation: 8,
            flex: 5,
          }}
        >
          <Text style={{ fontSize: 26, color: Colors.base1 }}>
            VARIAN CUKUR
          </Text>
          <FlatList
            data={sampleVarian}
            renderItem={({ item, index }) => {
              return (
                <VarianList
                  item={item}
                  addCukurVarian={addServis}
                  reduceCukurVarian={reduceServis}
                />
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: Colors.color1,
            width: (windowWidth * 70) / 100,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 50,
            elevation: 8,
          }}
          onPress={() => postCukurNow()}
        >
          <Text style={{ color: Colors.base1, fontSize: 30 }}>CUKUR NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
