import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const ReusableCheckbox = ({
  isChecked,
  onCheck,
  text,
  initialIcon,
  swappedIcon,
  width,
  height,
  iconSize,
  borderWidth,
  borderRadius,
  initialBorderColor,
  swappedBorderColor,
  initialColor,
  swappedColor,
  initialBackgroundColor,
  swappedBackgroundColor,
}) => {
  const color = isChecked ? swappedColor : initialColor;
  const backgroundColor = isChecked
    ? swappedBackgroundColor
    : initialBackgroundColor;
  const borderColor = isChecked ? swappedBorderColor : initialBorderColor;
  const iconName = isChecked ? swappedIcon : initialIcon;

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
      onPress={onCheck}
    >
      <Fontisto name={iconName} size={iconSize} color={color} />
      <Text style={{ color: color }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ReusableCheckbox;
