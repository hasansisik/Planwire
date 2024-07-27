import { View, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import {
  AppBar,
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../../../components";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../../components/general.style";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { editProfile } from "../../../redux/actions/userActions";
import { addressUpdateSchema } from "../../../utils/validation";

const UserAdress = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      province: "",
      city: "",
      street: "",
      avenue: "",
      no: "",
    },
    validationSchema: addressUpdateSchema,
    onSubmit: async (values) => {
      const address = `${values.street} ${values.avenue} No:${values.no},${values.city}/${values.province}`;
      const actionResult = await dispatch(editProfile({ address }));
      if (editProfile.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Adres Güncelleme Başarılı");
        setTimeout(() => {
          navigation.navigate("ProfileEdit");
        }, 3000);
      } else if (editProfile.rejected.match(actionResult)) {
        const NoticeMessage = actionResult.payload;
        setStatus("error");
        setMessage(NoticeMessage);
        setTimeout(() => setStatus(null), 3000);
      }
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
              text={"Adres"}
              family={"regular"}
              size={TEXT.large}
              color={COLORS.description}
            />
            <ReusableText
              text={"Güncelle"}
              family={"medium"}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />
          </View>
          <ReusableInput
            label="İl"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.province}
            onChangeText={formik.handleChange("province")}
            touched={formik.touched.province}
            error={formik.errors.province}
          />
          <ReusableInput
            label="İlçe"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
            touched={formik.touched.city}
            error={formik.errors.city}
          />
          <ReusableInput
            label="Mahalle"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.street}
            onChangeText={formik.handleChange("street")}
            touched={formik.touched.street}
            error={formik.errors.street}
          />
          <ReusableInput
            label="Caddesi"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.avenue}
            onChangeText={formik.handleChange("avenue")}
            touched={formik.touched.avenue}
            error={formik.errors.avenue}
          />
          <ReusableInput
            label="No"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.no}
            onChangeText={formik.handleChange("no")}
            touched={formik.touched.no}
            error={formik.errors.no}
          />
          <HeightSpacer height={25} />
          <ReusableButton
            btnText={"Güncelle"}
            width={SIZES.width - 40}
            height={40}
            borderRadius={SIZES.small}
            backgroundColor={COLORS.blue}
            textColor={COLORS.white}
            textFontSize={TEXT.small}
            textFontFamily={"medium"}
            onPress={formik.handleSubmit}
          />
        </View>
        {status && <NoticeMessage status={status} message={message} />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default UserAdress;
