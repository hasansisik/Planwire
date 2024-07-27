import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
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
import { companyUpdateSchema } from "../../../utils/validation";

const UserCompany = ({ navigation }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: { company: "" },
    validationSchema: companyUpdateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(editProfile({ company: values.company }));
      if (editProfile.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Şirket İsmi Değiştirme Başarılı");
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
            text={"Şirket Adı"}
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
          label="Şirket Adı"
          theme={{ colors: { primary: "black" } }}
          value={formik.values.company}
          onChangeText={formik.handleChange("company")}
          touched={formik.touched.company}
          error={formik.errors.company}
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
  );
};

export default UserCompany;
