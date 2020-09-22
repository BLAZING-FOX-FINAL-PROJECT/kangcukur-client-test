import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";
// import {postLogin} from '../store/action/index'
import axios from "axios";

export default function Login({ navigation }) {
  const radio_props = [
    { label: "customer", value: "customer" },
    { label: "kangcukur", value: "tukangcukur" },
  ];
  const [telepon, setTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [role, setRole] = useState("customer");

  const numberInputHandler = (input) => {
    setTelepon(input.replace(/[^0-9]/g, ""));
    if (telepon.length > 10) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  };

  const changeSecureText = () => {
    setIsSecureText(!isSecureText);
  };

  const _storeData = async(payload) => {
    try {
      await AsyncStorage.setItem("access_token", payload.access_token)
    } catch (err) {
      console.log(err);
    }
  }

  const _clearStoredData = async(payload) => {
    try {
      await AsyncStorage.removeItem("access_token")
      await AsyncStorage.removeItem("transaction_data")
    } catch (err) {
      console.log(err);
    }
  }

  const loginHandler = () => {
    const payload = {
      telepon,
      password,
    };
    axios({
      url: `https://tukangcukur.herokuapp.com/login/${role}`,
      method: "POST",
      data: payload,
    })
      .then(({ data }) => {
        // setAccess_token(data);
        _storeData(data)
        navigation.navigate(
          role === "customer" ? "CustomerHome" : "KangcukurHome"
        );
      })
      .catch(console.log);
    setTelepon("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Welcome !</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <Entypo name="phone" size={24} color="black" />
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(input) => numberInputHandler(input)}
              value={telepon}
              placeholder="Phone Number"
            />
          </View>
          <Entypo
            name="check"
            size={24}
            color={validNumber ? Colors.accent : "#d2d2d2"}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <Entypo name="lock" size={24} color="black" />
            <TextInput
              style={styles.input}
              secureTextEntry={isSecureText}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity onPress={changeSecureText}>
            <Entypo
              name={isSecureText ? "eye-with-line" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => loginHandler()}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => _clearStoredData()}>
          <Text style={styles.buttonText}>purge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => loginHandler()}
        >
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonInnerColor={Colors.color1}
            buttonOuterColor={Colors.accent}
            buttonSize={15}
            buttonOuterSize={25}
            animation={true}
            onPress={(value) => {
              setRole(value);
            }}
          />
        </TouchableOpacity>
        {/* <Text style={styles.buttonTextOutline}>Register</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    maxWidth: "90%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
  },
  inputFirst: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    marginVertical: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    marginBottom: 20,
  },
  fotoProfile: {
    borderColor: "black",
    borderRadius: 70,
    width: 120,
    height: 120,
    marginTop: -90,
  },
  input: {
    width: 300,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: "80%",
    borderRadius: 20,
    elevation: 8,
    marginTop: 30,
  },
  buttonOutline: {
    alignItems: "center",
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonTextOutline: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 18,
  },
});
