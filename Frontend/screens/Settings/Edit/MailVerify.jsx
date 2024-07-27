import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableText,
} from "../../../components";
import OTPTextInput from "react-native-otp-textinput";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../../components/general.style";
import { useDispatch } from "react-redux";
import { againEmail, verifyEmail } from "../../../redux/actions/userActions";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";

const MailVerify = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const email = route.params.email;

  const [verificationCode, setVerificationCode] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandler = async () => {
    const actionResult = await dispatch(
      verifyEmail({ email, verificationCode })
    );
    if (verifyEmail.fulfilled.match(actionResult)) {
      setStatus("success");
      setMessage("Doğrulama başarılı");
      setTimeout(() => {
        navigation.navigate("ProfileEdit");
      }, 3000);
    } else if (verifyEmail.rejected.match(actionResult)) {
      const NoticeMessage = actionResult.payload;
      setStatus("error");
      setMessage(NoticeMessage);
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const resendHandler = () => {
    dispatch(againEmail(email));
  };

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={general.page}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={50} />

        <View style={{ paddingBottom: 25 }}>
          <ReusableText
            text={"Mail'e Doğrulama"}
            family={"regular"}
            size={TEXT.large}
            color={COLORS.description}
          />
          <ReusableText
            text={"Kodu Gönderildi"}
            family={"medium"}
            size={TEXT.xxLarge}
            color={COLORS.black}
          />
        </View>
        {/* OTP Input */}
        <OTPTextInput
          handleTextChange={setVerificationCode}
          inputCount={4}
          keyboardType="numeric"
          tintColor={COLORS.black}
          offTintColor="#BBBCBE"
          backgroundColor={COLORS.white}
          textInputStyle={styles.OtpInput}
          containerStyle={styles.OtpContainer}
        />
        <HeightSpacer height={25} />
        <ReusableButton
          btnText={"Doğrula"}
          width={SIZES.width - 40}
          height={40}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.blue}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={submitHandler}
        />
      </View>
      <View style={styles.footer}>
        <ReusableText
          text={"Doğrulama Kodu Gelmedi mi ? "}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
        />
        <TouchableOpacity onPress={resendHandler}>
          <ReusableText
            text={"Tekrar Gönder"}
            family={"bold"}
            size={TEXT.small}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default MailVerify;

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    paddingHorizontal: 40,
    bottom: 50,
    width: SIZES.width,
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
