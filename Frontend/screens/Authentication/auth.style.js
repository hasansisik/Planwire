import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  context: {
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  OtpContainer: {
    marginHorizontal: 30,
  },
  OtpInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
  },
});


export default styles