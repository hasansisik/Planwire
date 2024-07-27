import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import styles from "../../screens/Home/home.style";
import general from "../general.style";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ProjectCard from "../Tiles/Cards/ProjectCard";
import { useNavigation } from "@react-navigation/native";
import ModalProject from "../Modals/ModalProject";
import ReusableText from "../Reusable/ReusableText";
import { getProjects } from "../../redux/actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Projects = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = await AsyncStorage.getItem("companyId");
      setCompanyId(storedCompanyId);
    };
    fetchCompanyId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProjects(companyId));
    }, [dispatch, companyId])
  );
  const {projects} = useSelector((state) => state.projects);

  return (
    <View style={general.column}>
      <View style={[general.row("space-between"), { paddingBottom: 25 }]}>
        <View style={general.row("space-between")}>
          <AntDesign name="appstore1" size={18} color="black" />
          <ReusableText
            text={"Projeler"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />
        </View>
        <TouchableOpacity style={styles.box} onPress={() => setShowModal(true)}>
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={projects}
        numColumns={2}
        key={2}
        vertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ gap: SIZES.medium }}
        renderItem={({ item }) => (
          <View style={{ marginRight: SIZES.medium }}>
            <ProjectCard
              item={item}
              onPress={() =>
                navigation.navigate("BottomTabNavigation", item._id)
              }
            />
          </View>
        )}
      />
      {/* ModalProject */}
      <ModalProject
        showFilters={showModal}
        setShowFilters={setShowModal}
        onProjectCreated={() => dispatch(getProjects(companyId))}
      />
    </View>
  );
};

export default Projects;
