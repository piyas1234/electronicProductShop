import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Spinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
     position:'relative',
     justifyContent:'center',
     top:300

  },
  horizontal: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    // padding: 10
  }
});

export default Spinner;