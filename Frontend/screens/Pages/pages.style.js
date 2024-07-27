import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  header: {
    width: SIZES.width,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  profile: {
    gap: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  settingsBox: {
    backgroundColor: COLORS.lightInput,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
});

export default styles;
