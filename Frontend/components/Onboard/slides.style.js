import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: SIZES.width,
        height: '100%',
    },
    stack: {
        position: "absolute",
        bottom: 0,
        marginBottom: 60,
        marginHorizontal: 30,
        alignItems: "center",
    },
    btn: {
        backgroundColor: COLORS.black,
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    }
})

export default styles