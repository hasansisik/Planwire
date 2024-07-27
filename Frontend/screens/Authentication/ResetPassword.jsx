import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import styles from "./auth.style";
import general from "../../components/general.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../../components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../utils/validation";
import { resetPassword } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";

const ResetPassword = ({ navigation, route }) => {
  const email = route.params.email;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: email,
      passwordToken: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(resetPassword(values));
      if (resetPassword.fulfilled.match(actionResult)) {
        navigation.navigate("Login");
        setStatus("success");
        setMessage("Şifre değiştirme başarılı");
      } else if (resetPassword.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      {/* Content */}
      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.ibb.co/7S7sZHg/background-line.png" }}
          style={{
            position: "absolute",
            width: SIZES.width,
            height: SIZES.height,
          }}
          resizeMode="contain"
        />
        <AppBar
          top={15}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={50} />
        <View style={{ padding: 20 }}>
          {/* Header */}
          <ReusableText
            text={"Şifremi Sıfırla"}
            family={"bold"}
            size={TEXT.xLarge}
            color={COLORS.blue}
          />
          {/* Description */}
          <ReusableText
            text={
              "Mail adresinize gönderilen doğrulama kodunu ve yeni şifrenizi giriniz."
            }
            family={"regular"}
            size={TEXT.medium}
            color={COLORS.description}
          />
          <HeightSpacer height={50} />
          <View>
            <ReusableInput
              label="Doğrulama Kodu"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.passwordToken.toString()}
              onChangeText={(value) =>
                formik.setFieldValue("passwordToken", Number(value))
              }
              touched={formik.touched.passwordToken}
              error={formik.errors.passwordToken}
              keyboardType="numeric"
            />
            {/* Password Input */}
            <ReusableInput
              label="Yeni Şifre"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.newPassword}
              onChangeText={formik.handleChange("newPassword")}
              touched={formik.touched.newPassword}
              error={formik.errors.newPassword}
            />
            {/* Confirm Password Input */}
            <ReusableInput
              label="Yeni Şifre Tekrar"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
            <HeightSpacer height={50} />
            {/* Reset Button */}
            <ReusableButton
              btnText={"Şifremi Değiştir"}
              width={SIZES.width - 40}
              height={50}
              borderRadius={SIZES.small}
              backgroundColor={COLORS.blue}
              textColor={COLORS.white}
              textFontSize={TEXT.small}
              textFontFamily={"medium"}
              onPress={formik.handleSubmit}
            />
          </View>
        </View>
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default ResetPassword;
