// Onboard Slides
import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./slides.style";
import { ReusableText, HeightSpacer } from "../../components/index";
import { COLORS, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Slides = ({ item, slides, goToNextSlide }) => {
  const navigation = useNavigation();
  const isLastSlide = slides[slides.length - 1].id === item.id;
    const handlePress = () => {
    if (isLastSlide) {
      navigation.navigate("CompanyLogin"); 
    } else {
      goToNextSlide();
    }
  };
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.stack}>
        <ReusableText
          text={item.header}
          family={"bold"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={item.title}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.description}
        />
        <HeightSpacer height={175} />
        {/* Slide Button */}
        {/* Spacer */}
        <TouchableOpacity style={styles.row} onPress={handlePress}>
          <ReusableText
            text={"Devam et"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.description}
          />
          <View style={styles.btn}>
            <AntDesign name="arrowright" size={20} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Slides;