import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: COLORS.lightGrey,
  },
  box: {
    height: 35,
    borderRadius: 30,
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: COLORS.lightInput,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
 
});

export default styles;
