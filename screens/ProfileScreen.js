import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors'
import Card from '../components/Card';
import Header from '../components/Header';
import EditProfile from '../components/EditProfile'

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('John Doe')
  const [phoneNumber, setPhoneNumber] = useState('+62 823 620 973 21')
  const [address, setAddress] = useState('Jl. Cinta Boulevard No.3 RT 07/02 Bintaro, Pasangrahan, Jepun, 12330')

  const [showEdit, setShowEdit] = useState(false)

  const editProfile = (name, phoneNumber, address) => {
    setName(name)
    setPhoneNumber(phoneNumber)
    setAddress(address)
    setShowEdit(false)
  }

  const cancelEditHandler = () => {
    setShowEdit(false)
  }

  return (
    <View style={styles.screen}>
      <Header title="Profile" />
      <EditProfile
        visible={showEdit}
        onEditProfile={editProfile}
        onCancel={cancelEditHandler}
        name={name}
        phoneNumber={phoneNumber}
        address={address}
      />

      <Card style={styles.profileContainer}>
        <Image
          onPress={() => setShowEdit(true)}
          style={styles.fotoProfile}
          source={{
            uri:
              'https://images.unsplash.com/photo-1558085324-2f298b28c714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          }}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Text style={styles.address}>{address}</Text>

      </Card>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowEdit(true)}
      >
        <Text style={styles.buttonText}>EDIT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => Alert.alert('Simple Button pressed')}
      >
        <Text style={styles.buttonTextOutline}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  btnContainer: {
    width: '80%',
    marginTop: 20,
  },
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  profileContainer: {
    width: '80%',
    alignItems: 'center',
    height: 200,
    marginTop: 100,
    marginBottom: 20
  },
  fotoProfile: {
    borderColor: 'black',
    borderRadius: 70,
    width: 120,
    height: 120,
    marginTop: -90,
  },
  name: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold"
  },
  phoneNumber: {
    color: '#303030',
    fontSize: 14
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#303030'
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8,
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

});


