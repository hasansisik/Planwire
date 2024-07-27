import { View, SafeAreaView, Platform, StatusBar } from "react-native";
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
import { useDispatch } from "react-redux";
import { projectCodeUpdateSchema } from "../../../utils/validation";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";
import { updateProject } from "../../../redux/actions/projectActions";
import { useFormik } from "formik";

const ProjectCode = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const projectId = route.params.projectId;

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const formik = useFormik({
    initialValues: { projectCode: "" },
    validationSchema: projectCodeUpdateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        updateProject({ projectId, projectCode: values.projectCode })
      );
      if (updateProject.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Proje kodu başarıyla güncellendi.");
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      } else if (updateProject.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        setStatus("error");
        setMessage(errorMessage);
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
            text={"Proje Kodu"}
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
          label="Proje Kodu"
          theme={{ colors: { primary: "black" } }}
          value={formik.values.projectCode}
          onChangeText={formik.handleChange("projectCode")}
          touched={formik.touched.projectCode}
          error={formik.errors.projectCode}
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

export default ProjectCode;
