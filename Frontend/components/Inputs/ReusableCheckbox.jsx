import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReusableCheckbox = ({
  isChecked,
  onCheck,
  text,
  initialIcon,
  swappedIcon,
  width,
  height,
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
      <Ionicons name={iconName} size={22} color={color} />
      <Text style={{ color: color }}>{text}</Text>

    </TouchableOpacity>
  );
};

export default ReusableCheckbox;
