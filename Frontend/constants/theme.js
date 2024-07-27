import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#D2FF53",
  transparent: "transparent",
  blue: "#006FFD",
  red: "#D80000",
  green: "#2AC65F",
  white: "#FBFBFB",
  yellow: "#FDD65D",
  orange: "#FFA500",
  lightWhite: "#FFFFFF",
  mediumWhite: "#F0F0F0",
  lightBlue: "#00B0FF",
  coldBlue: "#34DBE4",
  lightRed: "#DA7D7D",
  lightGreen: "#36DEA1",
  black: "#121212",
  dark: "#3D3A45",
  gray: "#8C8896",
  lightGrey: "#CACACA",
  lightBlack: "#292929",
  mediumBlack: "#1D1D1D",
  nagivationPrimary: "#EBEBEB",
  description: "#71727A",
  lightInput: "#F5F5F5",
  lightBorder: "#EDEDED",
};


const SIZES = {
    xSmall: 10,
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 20,
    xxLarge: 44,
    height,
    width
};

const TEXT = {
    xxSmall: 11,
    xSmall: 13,
    small: 15,
    medium: 17,
    large: 19,
    xLarge: 24,
    xxLarge: 27,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};


export { COLORS, SIZES, SHADOWS, TEXT };