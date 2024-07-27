import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";

const PlanCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlanDetails", { item })}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.planImages}}
          style={{ width: "100%", height: 150 }}
        />
      </View>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ReusableText
            text={item.planCode}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={new Date(item.createdAt).toLocaleDateString("tr-TR")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.description}
          />
        </View>
        <ReusableText
          text={item.planName}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.description}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
