import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import {
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../index";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

export default function ModalFile({ showFilters, setShowFilters }) {
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
        <HeightSpacer height={25} />
        <View>
          <ReusableText
            text={"Dosya Ekle"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Dosya Eklemek için aşağıdaki alanları doldurunuz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={25} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Dosya İsmi:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Dosya İsmi"
            theme={{ colors: { primary: "black" } }}
          />
        </View>
        <HeightSpacer height={10} />
        <ReusableButton
          btnText={"Proje Ekle"}
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
