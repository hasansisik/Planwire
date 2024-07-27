import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ReusableText = ({ text, family, size, color, align, underline }) => {
  return (
    <Text style={styles.textStyle(family, size, color, align, underline)}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, underline) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    textDecorationLine: underline ? "underline" : "none", // underline prop'u burada kontrol ediliyor
  }),
});
