import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '../../../constants/theme'
import ReusableText from '../../Reusable/ReusableText';

const ProjectCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: COLORS.lightInput }]}>
        <View>
          <ReusableText
            text={item.projectName}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableText
            text={item.adress}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
          <ReusableText
            text={item.projectCode}
            family={"medium"}
            size={TEXT.xSmall}
            color={COLORS.black}
          />
        </View>
        <View style={styles.logo}>
          <Image source={{ uri: item.logo }} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectCard

const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2 - 30,
    height: 200,
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    borderColor: "#E7E7E7",
    borderWidth: 1,
  },
  logo:{
    alignItems:"center"
  },
  image: {
    height: 75,
    width: 75,
  },
});