import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const reusable = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: COLORS.lightWhite,
  },
  rowWithSpace: (justifyContent) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: justifyContent,
  }),
  inputContainer: (error) => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: error ? COLORS.red : COLORS.lightGrey,
    overflow: "hidden",
  }),
  input: {
    backgroundColor: "#fff",
    color: COLORS.dark,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default reusable