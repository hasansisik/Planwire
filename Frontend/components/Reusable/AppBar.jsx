import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import reusable from "./reusable.style";
import { AntDesign } from "@expo/vector-icons";
import ReusableText from "./ReusableText";
import { COLORS, TEXT } from "../../constants/theme";

const AppBar = ({
  color,
  title,
  color1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
  text1
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={reusable.rowWithSpace("space-between")}>
        <TouchableOpacity style={styles.box(color)} onPress={onPress}>
          <AntDesign name="arrowleft" size={25} />
        </TouchableOpacity>

        <ReusableText
          text={title}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <TouchableOpacity style={styles.box1(color1)} onPress={onPress1}>
          <AntDesign name={icon} size={25} />
          <Text>{text1}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
  }),
  box: (color) => ({
    backgroundColor: color,
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
  box1: (color1) => ({
    backgroundColor: color1,
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }),
});
