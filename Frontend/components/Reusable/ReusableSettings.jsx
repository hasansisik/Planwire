import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, TEXT } from '../../constants/theme';
import ReusableText from './ReusableText';
import styles from "./reusable.style";

const ReusableSettings = ({icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <View style={{ flexDirection: "row", gap: 10,}}>
        <Ionicons name={icon} size={22} />
        <ReusableText
          text={title}
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.black}
        />
      </View>
      <Feather name="chevron-right" size={20} />
    </TouchableOpacity>
  );
};

export default ReusableSettings