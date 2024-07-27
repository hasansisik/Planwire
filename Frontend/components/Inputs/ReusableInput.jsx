import React, { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import styles from "../Reusable/reusable.style";

const ReusableInput = ({
  label,
  value,
  onChangeText,
  touched,
  error,
  secureTextEntry,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 const renderIcon = (props) => (
  <TextInput.Icon
    {...props}
    icon={passwordVisible ? "eye-off" : "eye"} // İkon durumuna bağlı olarak değişir
    onPress={togglePasswordVisibility}
  />
);

  return (
    <View>
      <View style={styles.inputContainer(error)}>
        <TextInput
          underlineStyle={{ display: "none" }}
          style={styles.input}
          label={label}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !passwordVisible}
          right={secureTextEntry ? renderIcon : null} // İkonu doğrudan bir fonksiyon olarak kullan
          {...props}
        />
      </View>
      <HelperText type="error" visible={touched && Boolean(error)}>
        {error}
      </HelperText>
    </View>
  );
};

export default ReusableInput;