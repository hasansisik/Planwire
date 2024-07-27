import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import ReusableText from "../Reusable/ReusableText";
import HeightSpacer from "../Reusable/HeightSpacer";
import ReusableInput from "../Inputs/ReusableInput";
import ReusableButton from "../Buttons/ReusableButton";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createProject } from "../../redux/actions/projectActions";
import { projectCreateSchema } from "../../utils/validation";
import NoticeMessage from "../Reusable/NoticeMessage";
import ProjectLogoUpload from "../Tiles/Upload/ProjectLogoUpload";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalProject({
  showFilters,
  setShowFilters,
  onProjectCreated,
}) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadFunction, setUploadFunction] = useState(null);
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  const handleUploadComplete = (url) => {
    formik.setFieldValue("logo", url);
    formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: { projectName: "", projectCode: "" },
    validationSchema: projectCreateSchema,
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        createProject({
          projectName: values.projectName,
          projectCode: values.projectCode,
          logo: values.logo,
          companyId,
        })
      );
      if (createProject.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Proje başarıyla oluşturuldu.");
        onProjectCreated();
        setTimeout(() => {
          setShowFilters(false);
        }, 1500);
      } else if (createProject.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        setStatus("error");
        setMessage(errorMessage);
        setTimeout(() => setStatus(null), 2000);
      }
    },
  });

  useEffect(() => {
    if (!showFilters) {
      setStatus(null);
      formik.resetForm();
    }
  }, [showFilters]);

  const handleSubmit = async () => {
    if (uploadFunction) {
      const url = await uploadFunction();
      if (!url) {
        formik.handleSubmit();
        return;
      }
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <Modal
      isVisible={showFilters}
      onSwipeComplete={() => setShowFilters(false)}
      swipeDirection="down"
      style={{ justifyContent: "flex-end", margin: 0 }}
      statusBarTranslucent={true}
    >
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <AntDesign name="close" size={22} />
        </TouchableOpacity>
        <HeightSpacer height={10} />
        <View>
          <ReusableText
            text={"Proje Oluştur"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Proje oluşturmak için aşağıdaki alanları doldurunuz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <HeightSpacer height={10} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Proje İsmi :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Proje Adı:"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.projectName}
            onChangeText={formik.handleChange("projectName")}
            touched={formik.touched.projectName}
            error={formik.errors.projectName}
          />
        </View>
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Proje Kodu:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Proje Kodu"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.projectCode}
            onChangeText={formik.handleChange("projectCode")}
            touched={formik.touched.projectCode}
            error={formik.errors.projectCode}
          />
        </View>
        <HeightSpacer height={10} />
        <ReusableText
          text={"Proje Logo :"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.black}
        />
        <ProjectLogoUpload
          onUploadComplete={handleUploadComplete}
          setUploadFunction={setUploadFunction}
        />
        <ReusableButton
          btnText={"Proje Ekle"}
          width={SIZES.width - 60}
          height={45}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.blue}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={handleSubmit}
        />
      </View>
      {status && <NoticeMessage status={status} message={message} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    paddingBottom: 40,
  },
});
