import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "./ReusableText";

const Tool = ({ onPress, iconName, text }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress();
  };

  return (
    <TouchableOpacity style={styles.tool} onPress={handlePress}>
      <View style={[styles.box, isSelected ? styles.selectedBox : null]}>
        <MaterialIcons
          name={iconName}
          size={25}
          style={{ color: isSelected ? COLORS.lightWhite : COLORS.lightBlack }}
        />
      </View>
      <ReusableText
        text={text}
        family={"medium"}
        size={TEXT.xSmall}
        color={COLORS.lightBlack}
      />
    </TouchableOpacity>
  );
};

const ToolBox = ({
  onPin,
  onDraw,
  onWrite,
  onUndo,
  onDelete,
  onChangeColor,
  onToolPress,
}) => {
  const handleToolPressInternal = (toolAction) => {
    switch (toolAction) {
      case "pin":
        onPin();
        break;
      case "draw":
        onDraw();
        break;
      case "write":
        onWrite();
        break;
      case "undo":
        onUndo();
        break;
      case "delete":
        onDelete();
        break;
      case "changeColor":
        onChangeColor();
        break;
      default:
        console.log("Unknown tool action");
    }
    onToolPress();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Tool
          onPress={() => handleToolPressInternal("pin")}
          iconName="person-pin"
          text="İşaretle"
        />
        {/* <Tool
          onPress={() => handleToolPressInternal("draw")}
          iconName="create"
          text="Çiz"
        />
        <Tool
          onPress={() => handleToolPressInternal("write")}
          iconName="text-fields"
          text="Yaz"
        />
        <Tool
          onPress={() => handleToolPressInternal("delete")}
          iconName="delete"
          text="Sil"
        />
        <Tool
          onPress={() => handleToolPressInternal("undo")}
          iconName="undo"
          text="Geri Al"
        />
        <Tool
          onPress={() => handleToolPressInternal("changeColor")}
          iconName="color-lens"
          text="Renk Değiştir"
        /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    paddingTop: 10,
    marginLeft: 8,
    backgroundColor: COLORS.lightWhite,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  tool: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.mediumWhite,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  selectedBox: {
    backgroundColor: COLORS.lightBlack,
  },
});

export default ToolBox;
