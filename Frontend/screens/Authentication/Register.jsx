import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { registerSchema } from "../../utils/validation";
import { register } from "../../redux/actions/userActions";
import NoticeMessage from "../../components/Reusable/NoticeMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };

    fetchCompanyId();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
          companyId,
        })
      );
      if (register.fulfilled.match(actionResult)) {
        navigation.navigate("Verify", { email: values.email });
        setStatus("success");
        setMessage("Kayıt başarılı");
      } else if (register.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
      }
      setTimeout(() => setStatus(null), 5000);
    },
  });

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
              text={"Merhaba,\nBize Katılın! 👋"}
              family={"bold"}
              size={TEXT.xLarge}
              color={COLORS.blue}
            />
            {/* Description */}
            <ReusableText
              text={"Kayıt olun ve uygulamamızı kullanmaya başlayın."}
              family={"regular"}
              size={TEXT.medium}
              color={COLORS.description}
            />
          </View>
        </View>
        {/* Footer */}
        <View style={styles.context}>
          {/* Inputs */}
          <View>
            {/* Username Input */}
            <ReusableInput
              label="İsim Soyisim"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              touched={formik.touched.name}
              error={formik.errors.name}
            />
            {/* Email Input */}
            <ReusableInput
              label="E-mail"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              touched={formik.touched.email}
              error={formik.errors.email}
            />
            {/* Password Input */}
            <ReusableInput
              label="Şifre"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            {/* Confirm Password Input */}
            <ReusableInput
              label="Şifre Tekrar"
              theme={{ colors: { primary: "black" } }}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
            {/* Register Button */}
            <ReusableButton
              btnText={"Kayıt Ol"}
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
          {/* Footer */}
          <View style={styles.footer}>
            <ReusableText
              text={"Hesabınız yok mu ? "}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
              underline={true}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <ReusableText
                text={"Kayıt Olun"}
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

export default Register;
