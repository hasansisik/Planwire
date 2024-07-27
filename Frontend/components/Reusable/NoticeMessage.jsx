import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import { COLORS } from "../../constants/theme";

const NoticeMessage = ({ message, status, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  const getBackgroundColor = () => {
    switch (status) {
      case 'error':
        return COLORS.red;
      case 'success':
        return COLORS.green;
      default:
        return COLORS.red;
    }
  };

  useEffect(() => {
    setVisible(true); // Herhangi bir prop değiştiğinde visible'ı true yap

    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, status, duration]); // message, status veya duration değiştiğinde useEffect'i tetikle

  if (!visible) return null;

  return (
    <View style={[styles.errorContainer, { backgroundColor: getBackgroundColor(), top: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }]}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    position: "absolute",
    width: Dimensions.get("window").width,
    padding: 4,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default NoticeMessage;