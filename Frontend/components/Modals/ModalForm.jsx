import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import {
  HeightSpacer,
  ReusableButton,
  ReusableInput,
  ReusableText,
} from "../index";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import NoticeMessage from "../Reusable/NoticeMessage";
import { Dropdown } from "react-native-element-dropdown";
import { getAllUsers } from "../../redux/actions/userActions";
import { createForm } from "../../redux/actions/formActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalForm({ showFilters, setShowFilters, projectId }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const companyId = await AsyncStorage.getItem("companyId");
      if (companyId) {
        dispatch(getAllUsers(companyId));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const dropdownUser = users.map((person) => ({
    userId: person._id,
    userName: person.name,
  }));

  const formik = useFormik({
    initialValues: { formCategory: "", formTitle: "", formDescription: "" },
    onSubmit: async (values) => {
      const formData = {
        formTitle: values.formTitle,
        formCategory: values.formCategory,
        formDescription: values.formDescription,
        formPerson: selectedUserId,
        formCreator: user._id,
      };
      const actionResult = await dispatch(
        createForm({
          projectId,
          ...formData,
        })
      );
      if (createForm.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Form başarıyla oluşturuldu.");
        setTimeout(() => {
          setShowFilters(false);
        }, 1500);
      } else if (createForm.rejected.match(actionResult)) {
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
        <HeightSpacer height={25} />
        <View>
          <ReusableText
            text={"Görev Oluştur"}
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Görev oluşturmak için aşağıdaki alanları doldurunuz."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        {/* Form Category Input */}
        <HeightSpacer height={25} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Form Kategorisi :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Form Kategorisi"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.formCategory}
            onChangeText={formik.handleChange("formCategory")}
            touched={formik.touched.formCategory}
            error={formik.errors.formCategory}
          />
        </View>
        {/* Form Title Input */}
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Form Başlığı :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Form Başlığı"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.formTitle}
            onChangeText={formik.handleChange("formTitle")}
            touched={formik.touched.formTitle}
            error={formik.errors.formTitle}
          />
        </View>
        {/* Form Desc Input */}
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"Form Açıklaması :"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Form Açıklaması"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.formDescription}
            onChangeText={formik.handleChange("formDescription")}
            touched={formik.touched.formDescription}
            error={formik.errors.formDescription}
          />
        </View>
        {/* User Selected */}
        <HeightSpacer height={25} />
        <View style={{ gap: 5 }}>
          <ReusableText
            text={"İlgili Kişi Seç:"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View
            style={{
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
              paddingVertical: 20,
            }}
          >
            <Dropdown
              data={dropdownUser}
              labelField="userName"
              valueField="userId"
              value={selectedUserId}
              onChange={(item) => {
                setSelectedUserId(item.userId);
              }}
              placeholder="Kişi Seçin"
            />
          </View>
        </View>
        <HeightSpacer height={50} />
        <ReusableButton
          btnText={"Form Oluştur"}
          width={SIZES.width - 60}
          height={50}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.blue}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
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
