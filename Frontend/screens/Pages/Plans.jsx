import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import styles from "../../screens/Home/home.style";
import general from "../../components/general.style";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { PlanCard, ReusableText, WidthSpacer } from "../../components";
import ModalPlan from "../../components/Modals/ModalPlan";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../redux/actions/planActions";
import { useFocusEffect } from "@react-navigation/native";

const Plans = ({ route, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.plans);
  const { projectId } = route.params;
  const allCategories = [...new Set(plans.map((plan) => plan.planCategory))];
  const [openCategories, setOpenCategories] = useState([...allCategories]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPlans(projectId));
    }, [dispatch, projectId])
  );

  const toggleCategory = (planCategory) => {
    if (openCategories.includes(planCategory)) {
      setOpenCategories(openCategories.filter((cat) => cat !== planCategory));
    } else {
      setOpenCategories([...openCategories, planCategory]);
    }
  };
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
              text={"Planlar"}
              family={"medium"}
              size={TEXT.large}
              color={COLORS.black}
            />
          </View>
          <View style={general.row("")}>
            {/* Search Button */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("PlanSearch")}
            >
              <AntDesign name="search1" size={20} color="black" />
            </TouchableOpacity>
            <WidthSpacer width={5} />
            {/* Add Button */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => setShowModal(true)}
            >
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={plans}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: SIZES.medium }}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={general.row("space-between", "flex-start")}
                onPress={() => toggleCategory(item.planCategory)}
              >
                <View style={[general.row(""), { paddingBottom: 10 }]}>
                  <Ionicons
                    name={"albums-outline"}
                    color={COLORS.black}
                    size={24}
                  />
                  <ReusableText
                    text={item.planCategory}
                    family={"medium"}
                    size={TEXT.small}
                    color={COLORS.black}
                  />
                </View>
                <Feather
                  name={
                    openCategories.includes(item.planCategory)
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                />
              </TouchableOpacity>
              {openCategories.includes(item.planCategory) && (
                <PlanCard item={item} navigation={navigation} />
              )}
            </View>
          )}
        />
        {/* ModalPlan */}
        <ModalPlan
          showFilters={showModal}
          setShowFilters={setShowModal}
          projectId={projectId}
        />
      </View>
    </SafeAreaView>
  );
};

export default Plans;
