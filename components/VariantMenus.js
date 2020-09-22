import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function VariantMenus() {
  const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
  });

  return (
    <View style={styles.container}>
      <Text>VARIANT MENU</Text>
    </View>
  )
}
