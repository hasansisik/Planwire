import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  KeyboardAvoidingView,
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
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import { companyLogin } from "../../redux/actions/companyActions";

const CompanyLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: { CompanyCode: "", password: "" },
    onSubmit: async (values) => {
      const actionResult = await dispatch(companyLogin(values));
      if (companyLogin.fulfilled.match(actionResult)) {
        navigation.navigate("Auth");
        setStatus("success");
        setMessage("Giriş başarılı");
      } else if (actionResult.type === companyLogin.rejected.type) {
        const errorMessage = actionResult.error.message;
        setMessage(errorMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

  const handleForgotInfoPress = () => {
    Linking.openURL(
      "mailto:destek@planwire.com?subject=Bilgilerimi Unuttum&body=Merhaba, bilgilerimi unuttum, yardımcı olabilir misiniz?"
    );
  };
  const handleApplyPress = () => {
    Linking.openURL(
      "mailto:basvur@planwire.com?subject=Başvuru&body=Merhaba, şirket kodu başvurusunda bulunmak istiyorum."
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={[
          general.container,
          { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
        ]}
      >
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
          <View style={{ padding: 20 }}>
            <ReusableText
              text={"Merhaba,\nHoşgeldiniz! 👋\n"}
              family={"bold"}
              size={TEXT.xLarge}
              color={COLORS.blue}
            />
            <ReusableText
              text={
                "Şirketinizin bilgilerine erişmek için lüfen size Planwire tarafından verilmiş olan bilgileri doldurun.\n\nŞirket Kodu kısmında büyük-küçük harf'e duyarlıdır."
              }
              family={"regular"}
              size={TEXT.medium}
              color={COLORS.description}
            />
          </View>
        </View>
        <View style={styles.context}>
          <View>
            <ReusableInput
              label="Şirket Kodu"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.CompanyCode}
              onChangeText={formik.handleChange("CompanyCode")}
              touched={formik.touched.CompanyCode}
              error={formik.errors.CompanyCode}
            />
            <ReusableInput
              label="Şifre"
              secureTextEntry={true}
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <ReusableButton
              btnText={"Giriş Yap"}
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
          <HeightSpacer height={50} />
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleForgotInfoPress}>
              <ReusableText
                text={"Bilgileri Unuttum ? "}
                family={"bold"}
                size={TEXT.small}
                color={COLORS.blue}
                underline={true}
              />
            </TouchableOpacity>
            <ReusableText
              text={"Şirket Kodunuz yok mu ? "}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
              underline={true}
            />
            <TouchableOpacity onPress={handleApplyPress}>
              <ReusableText
                text={"Başvur"}
                family={"bold"}
                size={TEXT.small}
                color={COLORS.blue}
                underline={true}
              />
            </TouchableOpacity>
          </View>
        </View>
        {status && <NoticeMessage status={status} message={message} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CompanyLogin;
