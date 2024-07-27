import {
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { FormCard, ReusableText } from "../../components";
import general from "../../components/general.style";
import styles from "../../screens/Home/home.style";
import ModalForm from "../../components/Modals/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../../redux/actions/formActions";
import { useFocusEffect } from "@react-navigation/native";

const Form = ({ route }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { projectId } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getForms(projectId));
    }, [dispatch, projectId])
  );

  const { forms } = useSelector((state) => state.forms);

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={general.page}>
        <View style={[general.row("space-between"), { paddingBottom: 25 }]}>
          <View style={general.row("space-between")}>
            <ReusableText
              text={"Formlar"}
              family={"medium"}
              size={TEXT.large}
              color={COLORS.black}
            />
          </View>
          <View style={general.row("")}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => setShowModal(true)}
            >
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={forms}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: SIZES.medium }}
          renderItem={({ item }) => <FormCard item={item} />}
        />
      </View>
      {/* ModalProject */}
      <ModalForm
        showFilters={showModal}
        setShowFilters={setShowModal}
        projectId={projectId}
      />
    </SafeAreaView>
  );
};

export default Form;
