import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import ImageViewer from "react-native-image-zoom-viewer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppBar } from "../../components";
import ToolBox from "../../components/Reusable/ToolBox";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPin, getPins } from "../../redux/actions/planActions";
import { useFocusEffect } from "@react-navigation/native";
import ModalTaskPlan from "../../components/Modals/ModalTaskPlan";

const PlanDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();

  const [taskId, setTaskId] = useState(null);
  const [pendingPin, setPendingPin] = useState(null);
  const [isZoomEnabled, setIsZoomEnabled] = useState(true);
  const [isPinActive, setIsPinActive] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [pins, setPins] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const images = [
    {
      url: item.planImages,
      props: { progressiveRenderingEnabled: true },
    },
  ];

  const imageUrl = item.planImages;

  useEffect(() => {
    Image.getSize(
      imageUrl,
      (width, height) => {
        setImageSize({ width, height });
      },
      (error) => {
        console.error("Hata:", error);
      }
    );
  }, [imageUrl]);

  const fetchPins = async () => {
    const actionResult = await dispatch(getPins(item._id));
    if (getPins.fulfilled.match(actionResult)) {
      setPins(actionResult.payload);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPins();
      return () => {};
    }, [dispatch, item._id])
  );

  const toggleZoom = () => {
    setIsZoomEnabled((prev) => !prev);
  };

  const handleToolPress = () => {
    toggleZoom();
  };

  const handlePin = () => {
    setIsPinActive(!isPinActive);
  };

  const handlePinPress = (item) => {
    const taskDetails = item.task;
    navigation.navigate("TaskDetails", { item: taskDetails });
  };

  const handlePinPlacement = (e) => {
    setShowModalTask(true);
    const { width, height } = imageSize;
    const { locationX, locationY } = e.nativeEvent;

    let newPin = {};

    if (isZoomEnabled) {
      const scaleX = width / SIZES.width;
      const scaleY = height / SIZES.height;

      newPin = {
        x: ((locationX * scaleX) / width) * 100,
        y: ((locationY * scaleY) / height) * 100,
      };
    } else {
      newPin = {
        x: (locationX / SIZES.width) * 100,
        y: (locationY / SIZES.height) * 100,
      };
    }

    setPendingPin(newPin);
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: COLORS.white },
        { paddingTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight },
      ]}
    >
      <View style={styles.header}>
        <AppBar
          top={40}
          left={20}
          right={20}
          title={item.planCode}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* ImageViewer */}
        <ImageViewer
          imageUrls={images}
          enableImageZoom={isZoomEnabled}
          enableSwipeDown={isZoomEnabled}
          renderIndicator={() => null}
          backgroundColor={COLORS.lightWhite}
          style={{ flex: 1 }}
          loadingRender={() => <ActivityIndicator />}
          maxOverflow={SIZES.width / 6}
          renderImage={(props) => (
            <View>
              <Image {...props} />
              {pins.map((pin, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    zIndex: 3,
                  }}
                  onPress={() => {
                    handlePinPress(pin);
                  }}
                >
                  <MaterialIcons name="person-pin" size={18} color="red" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {/* Touchable Overlay for Pin Placement */}
        {isPinActive && (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: imageSize.width,
              height: imageSize.height,
              zIndex: 2,
            }}
            onPress={handlePinPlacement}
            activeOpacity={1}
          />
        )}
      </GestureHandlerRootView>
      <ToolBox onPin={handlePin} onToolPress={handleToolPress} />
      <ModalTaskPlan
        showFilters={showModalTask}
        setShowFilters={setShowModalTask}
        projectId={
          typeof item.project === "object" ? item.project._id : item.project
        }
        planId={item._id}
        onTaskCreated={async (taskId) => {
          setTaskId(taskId);
          if (pendingPin) {
            await dispatch(
              createPin({
                planId: item._id,
                x: pendingPin.x,
                y: pendingPin.y,
                task: taskId,
              })
            );
            setPendingPin(null);
            await fetchPins();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    backgroundColor: COLORS.lightWhite,
    zIndex: 1,
    width: SIZES.width,
    height: 60,
  },
});
