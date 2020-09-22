import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card'


export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>

      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>WELCOME</Text>
        </View>
        <Card style={styles.formContainer}>
          {/* <Image
            style={styles.fotoProfile}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
            }}
          /> */}
          <Text style={styles.title}>PHONE NUMBER</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="e.g. 082362097322"
          />
          <Text style={styles.title}>PASSWORD</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </Card>
        {/* <Button
          onPress={() => Alert.alert('Simple Button pressed')}
          title="Register"
          accessibilityLabel="Learn more about this purple button"
        /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Simple Button pressed')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => Alert.alert('Simple Button pressed')}
        >
          <Text style={styles.buttonTextOutline}>Register</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 40,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8
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
    color: 'white'
  },
  buttonTextoutline: {
    color: Colors.accent
  }
})


