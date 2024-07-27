import React, { useEffect, useState } from "react";
import { View, Platform, StatusBar, SafeAreaView } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import MasonryList from "react-native-masonry-list";
import ImageViewing from "react-native-image-viewing";
import { ReusableText } from "../../components";
import general from "../../components/general.style";
import ModalFile from "../../components/Modals/ModalFile";
import { getFiles } from "../../redux/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";

const Files = ({ route }) => {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isVisible, setIsVisible] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const dispatch = useDispatch();
 const { projectId } = route.params;
 const { files} = useSelector((state) => state.tasks);

 useEffect(() => {
   dispatch(getFiles(projectId));
 }, [dispatch, projectId]);

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={general.page}>
        <View style={[general.row("space-between"), { paddingBottom: 25 }]}>
          <ReusableText
            text={"Dosyalar"}
            family={"medium"}
            size={TEXT.large}
            color={COLORS.black}
          />
        </View>
        <MasonryList
          images={files.map((file, index) => ({
            uri: file,
            id: index,
          }))}
          columns={2}
          imageContainerStyle={{ borderRadius: 15 }}
          showsVerticalScrollIndicator={false}
          onPressImage={({ index }) => {
            setCurrentImageIndex(index);
            setIsVisible(true);
          }}
        />
        <ImageViewing
          images={files.map((file) => ({ uri: file }))}
          imageIndex={currentImageIndex}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
      <ModalFile showFilters={showModal} setShowFilters={setShowModal} />
    </SafeAreaView>
  );
};

export default Files;
