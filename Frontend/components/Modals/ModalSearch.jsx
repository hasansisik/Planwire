import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import {
  HeightSpacer,
  ReusableButton,
  ReusableCheckbox,
  ReusableInput,
  ReusableText,
} from "../index";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

export default function ModalSearch({ showFilters, setShowFilters }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal
      isVisible={showFilters}
      onSwipeComplete={() => setShowFilters(false)}
      swipeDirection="down"
      style={{ justifyContent: "flex-end", margin: 0 }}
      statusBarTranslucent={true}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <AntDesign name="close" size={22} />
        </TouchableOpacity>
        <HeightSpacer height={15} />
        <View>
          <ReusableText
            text={"Filtrele"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Filtreleme yaparak aradığınızı daha hızlı bulabilirsiniz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={25} />
        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ReusableText
            text={"Adıma Ait Olanları Listele"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableCheckbox
            isChecked={isChecked}
            onCheck={handleCheck}
            iconSize={38}
            initialIcon="toggle-off"
            swappedIcon="toggle-on"
            initialColor={COLORS.lightGrey}
            swappedColor={COLORS.blue}
          />
        </View>
        <HeightSpacer height={40} />
        <ReusableButton
          btnText={"Filtrele"}
          width={SIZES.width - 60}
          height={50}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.blue}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    paddingBottom: 40,
  },
});
