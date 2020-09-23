import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, Text, View, Image, FlatList } from "react-native"
import Colors from "../constants/colors"
import HistoryDetailCard from "./HistoryDetailCard"

export default function HistoryCard({ item }) {
  const [showDetail, setShowDetail] = useState(false)
  const { nama, customer, info, rating } = item


  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  return (
    <TouchableOpacity onPress={toggleDetail}>
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
              <Text style={styles.title}>{nama}</Text>
              <Text style={styles.info}>{info}</Text>
            </View>
          </View>
          <View style={styles.btnDetail}>
            <Text style={styles.textLink}>Detail</Text>
          </View>
      </View>
        {!showDetail &&
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => setShowDetail(false)}>
              <HistoryDetailCard item={item} />
            </TouchableOpacity>
          </View>
        }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textLink: {
    fontWeight: 'bold',
    color: Colors.accent
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.base1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  text: {
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14
  },
  rating: {
    fontSize: 18,
    marginLeft: 10
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: 'row'
  }
})

