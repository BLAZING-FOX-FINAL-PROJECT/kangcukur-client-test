import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card'
// import { Ionicons } from '@expo/vector-icons'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';



export default function FindDriver({ navigation }) {


  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Finding Bang Cukur</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRM8uXhVk-H56P7eVwwth5qnFm8-zEWIYsY1A&usqp=CAU' }} />

      </View>
      <Card style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Detail Booking</Text>
        <View style={styles.detail}>
          <View style={styles.detailComponent}>
            <MaterialIcons name="place" size={24} style={styles.icon} />
            <Text>Jl.Apel 19b, Condong Catur</Text>
          </View>
          <View style={styles.detailComponent}>
            <MaterialIcons name="content-cut" size={24} style={styles.icon} />
            <Text>Cukur Dewasa + Pikat</Text>
          </View>
          <View style={styles.detailComponent}>
            <Entypo name="user" size={24} style={styles.icon} />
            <Text>2 Orang</Text>
          </View>
          <View style={styles.detailComponent}>
            <Ionicons name="md-pricetags" size={24} color="black" style={styles.icon} />
            <Text>23 K</Text>
          </View>
        </View>
      </Card>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Simple Button pressed')}
      >
        <Text style={styles.buttonText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 20
  },
  detail: {
    borderColor: 'black',
    width: 300
  },
  detailComponent: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
  detailTitle: {
    width: 300,
    fontSize: 18,
    marginBottom: 10,
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.color1,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8
  },
  buttonText: {
    color: 'white'
  },
  imageContainer: {
    marginVertical: 20,
    width: 200,
    height: 200,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  }
})


