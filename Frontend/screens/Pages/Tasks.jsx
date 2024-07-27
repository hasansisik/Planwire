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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ReusableText, TaskCard, WidthSpacer } from "../../components";
import ModalTask from "../../components/Modals/ModalTask";
import general from "../../components/general.style";
import styles from "../../screens/Home/home.style";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/actions/taskActions";
import { useFocusEffect } from "@react-navigation/native";

const Tasks = ({ route, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { projectId } = route.params;

   useFocusEffect(
     React.useCallback(() => {
       dispatch(getTasks(projectId));
     }, [dispatch, projectId])
   );

  const { tasks } = useSelector((state) => state.tasks);
 
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
              text={"Görevler"}
              family={"medium"}
              size={TEXT.large}
              color={COLORS.black}
            />
          </View>
          <View style={general.row("")}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("TaskSearch")}
            >
              <AntDesign name="search1" size={20} color="black" />
            </TouchableOpacity>
            <WidthSpacer width={5} />
            <TouchableOpacity
              style={styles.box}
              onPress={() => setShowModal(true)}
            >
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={tasks}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: SIZES.medium }}
          renderItem={({ item }) => (
            <TaskCard item={item} navigation={navigation} />
          )}
        />
      </View>
      {/* ModalProject */}
      <ModalTask
        showFilters={showModal}
        setShowFilters={setShowModal}
        projectId={projectId}
      />
    </SafeAreaView>
  );
};

export default Tasks;
