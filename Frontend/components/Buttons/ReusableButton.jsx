import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const ReusableButton = ({
  onPress,
  btnText,
  textColor,
  textFontSize,
  textFontFamily,
  height,
  width,
  backgroundColor,
  borderWidth,
  borderColor,
  borderRadius,
  underline = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(width,height, backgroundColor, borderWidth, borderColor,borderRadius,)}
    >
      <Text style={styles.btnText(textColor,textFontSize,textFontFamily,underline)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;

const styles = StyleSheet.create({
  btnText: (textColor,textFontSize,textFontFamily,underline) => ({
    fontFamily: textFontFamily,
    fontSize: textFontSize,
    color: textColor,
    textDecorationLine: underline ? 'underline' : 'none',

  }),
  btnStyle: (width, height,backgroundColor, borderWidth, borderColor,borderRadius) => ({
    width: width,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: height,
    borderRadius: borderRadius,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});
