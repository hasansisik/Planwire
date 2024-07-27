import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    searchView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        alignItems: "center",
    },
    inputPlan: {
        width: "100%",
        fontFamily: 'regular',
        backgroundColor: COLORS.lightInput,
        paddingHorizontal: 10,
    },
    input: {
        width: "80%",
        fontFamily: 'regular',
        backgroundColor: COLORS.lightInput,
        paddingHorizontal: 10,
    },
    filter: {
        marginHorizontal: 10,
        alignItems: "center",
        gap: 2,
    },
    searchImage: {
        resizeMode: "contain",
        width: "100%",
        height: SIZES.height / 2.2,
        paddingHorizontal: 20
    },
    searchWrapper: {
        flex: 1,
        borderRadius: SIZES.small,
    },

})

export default styles