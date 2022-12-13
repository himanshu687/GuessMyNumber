import { Platform, StyleSheet, Text } from "react-native";
import React from "react";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.select({ android: 2, ios: 0 }),
    borderColor: "white",
    borderRadius: 4,
    padding: 12,
    maxWidth: "85%",
    width: 300,
  },
});
