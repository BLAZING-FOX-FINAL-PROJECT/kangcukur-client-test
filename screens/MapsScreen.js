import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/colors'
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import Polyline from '@mapbox/polyline'

import { Marker } from 'react-native-maps'

import MapViewDirections from 'react-native-maps-directions';
// const origin = {latitude: -7.557482,  longitude: 110.848912};
// const destination = {latitude: -7.552847,  longitude: 110.821877};
// const GOOGLE_MAPS_APIKEY = '…';


const locations = require("../locations.json") // ambil dari data base
const { width, height } = Dimensions.get('window')

const GOOGLE_MAP_KEY = 'AIzaSyDLbs4yYjr32vm1H2GIVVMUdOKNjGRzf3o'
// const GOOGLE_MAP_KEY = 'AIzaSyAAGaL2oshxzqev_ePMBA63zOE4q4pz5fM'



export default class MapsScreen extends Component {
  state = {
    latitude : null,
    longitude : null,
    locations: locations
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    console.log(status,"status")
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
      console.log(response,"respone")
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) => this.setState({latitude, longitude }, this.mergeCoords),
      (error) => console.log('error getCurr:',error)
    )

    const { locations: [ sampleLocation] } = this.state

    this.setState({
      desLatitude: sampleLocation.coords.latitude, // sesuaikan dengan yg di database
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)
  }


  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null


    if(hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GOOGLE_MAP_KEY}`)
      const respJson = await resp.json();
      console.log(respJson,"<<<<<<<")
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time })
    } catch(error) {
      console.log('Error getDir: ', error)
    }
  }

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } =location
    this.setState({
      destination:location,
      desLatitude: latitude,
      desLongitude: longitude

    }, this.mergeCoords)
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const { coords: { latitude, longitude }} = location
            return (
              <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                onPress={this.onMarkerPress(location)}
                pinColor={"green"}
              />
            )
          })
        }
      </View>
    )
  }

          // <Marker coordinate={{ latitudeDriver, longitudeDriver }}
          //   pinColor={"purple"} // any color
          //   title={"title"}
          //   description={"description"}
          // />

  render() {
    const { latitude, longitude, coords, destination } = this.state

    if (latitude) {
      return (
        <MapView
          showsUserLocation
          style={{ flex : 1}}
          initialRegion = {{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
        <Header title="Maps" />
        {this.renderMarkers()}
          <MapView.Polyline
            strokeWidth={2}
            strokeColor="red"
            coordinates={coords}
          >
          </MapView.Polyline>
          <View
            style={styles.mapsText}>
            <Text style={{ fontWeight: 'bold' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            <Text style={{ fontWeight: 'bold' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          </View>
        </MapView>
      )
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>We need your permissions</Text>
      </View>
    )
  }
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
