import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card'
import { Entypo, MaterialIcons } from '@expo/vector-icons';


export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [validNumber, setValidNumber] = useState(false)
  const [validName, setValidName] = useState(false)
  const [validAddress, setValidAddress] = useState(false)

  const [isSecureText, setIsSecureText] = useState(true)

  const numberInputHandler = input => {
    setPhoneNumber(input.replace(/[^0-9]/g, ''))
    if (phoneNumber.length > 10) {
      setValidNumber(true)
    } else {
      setValidNumber(false)

    }
  }

  const nameInputHandler = input => {
    let validasiHuruf = /^[a-zA-Z ]+$/;
    if (input.match(validasiHuruf)) {
      setName(input)
    }
    else {
      alert("Masukkan nama Anda!\nFormat wajib huruf!");
      setName('')
      setValidName(false)
    }
    if (name.length >5) {
      setValidName(true)
    } else {
      setValidName(false)

    }
  }

  const addresInputHandler = input => {
    setAddress(input)
    if (address.length > 5) {
      setValidAddress(true)
    } else {
      setValidAddress(false)

    }
  }

  const changeSecureText = () => {
    setIsSecureText(!isSecureText)
  }

  const onRegisterHandler = () => {
    setName('')
    setAddress('')
    setPhoneNumber('')
    setPassword('')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>

      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Register Dong !</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <Entypo name="user" size={24} color="black" />
            <TextInput
              style={styles.input}
              onChangeText={text => nameInputHandler(text)}
              value={name}
              placeholder="Username"
            />

          </View>
          <Entypo name="check" size={24} color={validName ? Colors.accent : '#d2d2d2'} />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <MaterialIcons name="place" size={24} color="black" />
            <TextInput
              style={styles.input}
              onChangeText={text => addresInputHandler(text)}
              value={address}
              placeholder="Address"
            />

          </View>
          <Entypo name="check" size={24} color={validAddress ? Colors.accent : '#d2d2d2'} />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <Entypo name="phone" size={24} color="black" />
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={input => numberInputHandler(input)}
              value={phoneNumber}
              placeholder="Phone Number"
            />

          </View>
          <Entypo name="check" size={24} color={validNumber ? Colors.accent : '#d2d2d2'} />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputFirst}>
            <Entypo name="lock" size={24} color="black" />
            <TextInput
              style={styles.input}
              secureTextEntry={isSecureText}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
            />

          </View>
          <TouchableOpacity onPress={changeSecureText}>
            <Entypo name={isSecureText ? "eye-with-line" : "eye"} size={24} color="black" />

          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterHandler()}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent
  },
  inputFirst: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  header: {
    marginVertical: 20
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  formContainer: {
    marginBottom: 20
  },
  fotoProfile: {
    borderColor: 'black',
    borderRadius: 70,
    width: 120,
    height: 120,
    marginTop: -90,
  },
  input: {
    width: 300,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8,
    marginTop: 30
  },
  buttonOutline: {
    alignItems: "center",
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonTextOutline: {
    color: Colors.accent,
    fontWeight: 'bold',
    fontSize: 18
  }
})



