import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { AppBar, ReusableText } from "../../components/index.js";
import { Feather, Ionicons } from "@expo/vector-icons";
import MessagesFile from "../../components/Tiles/Upload/MessagesFile.jsx";
import CameraFile from "../../components/Tiles/Upload/CameraFile.jsx";
import ModalSelectUser from "../../components/Modals/ModalSelectUser.jsx";
import { addMessageToTask, getTask } from "../../redux/actions/taskActions.js";
import { storage } from "../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageViewing from "react-native-image-viewing";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import backgroundImage from "../../assets/images/chatBackground.jpg";
import general from "../../components/general.style.js";

const TaskDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const { user } = useSelector((state) => state.user);
  const { task, loading } = useSelector((state) => state.tasks);

  const [messageText, setMessageText] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMessagesFileVisible, setIsMessagesFileVisible] = useState(false);
  const [isModalTaskPlanVisible, setIsModalTaskPlanVisible] = useState(false);

  const taskId = item._id;
  const flatListRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTask(taskId));
    }, [dispatch, taskId])
  );

  useEffect(() => {
    if (task?.messages?.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [task?.messages]);

  const toggleModalTaskPlan = () => {
    setIsModalTaskPlanVisible(!isModalTaskPlanVisible);
  };

  const uploadImage = async (uri, projectId) => {
    if (!uri) return null;
    const response = await fetch(uri);
    const blob = await response.blob();
    const date = new Date();
    const formattedDate = date.toISOString().split(".")[0].replace("T", "-");
    const filename = `${projectId}-${formattedDate}.jpg`;
    const storageRef = ref(storage, `PlanwireFile/${filename}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleTextSubmit = (event) => {
    const messageText = event.nativeEvent.text;
    handleSendMessage(selectedImageUri, messageText);
  };

  const handleSendMessage = async (
    imageUri,
    messageText,
    selectedUser = null
  ) => {
    let fileUrl = null;
    if (imageUri) {
      fileUrl = await uploadImage(imageUri, item._id);
    }
    const content = selectedUser ? `@${selectedUser}` : messageText;
    await dispatch(
      addMessageToTask({
        taskId: item._id,
        content,
        senderId: user._id,
        files: fileUrl ? [fileUrl] : [],
      })
    );
    dispatch(getTask(item._id));
    setMessageText("");
    setSelectedImageUri(null);
  };

  const allFiles =
    task?.messages
      ?.map((message) => message.files)
      .flat()
      .map((file) => ({ uri: file })) || [];

  const renderItem = ({ item }) => (
    <View style={general.row("")}>
      <Image
        source={{ uri: item.sender.picture }}
        style={{ width: 40, height: 40 }}
      />
      <View style={styles.messageContainer}>
        {item.content && <Text style={styles.messageText}>{item.content}</Text>}
        {item.files && item.files.length > 0 && (
          <FlatList
            data={item.files}
            horizontal
            renderItem={({ item: fileUri, index }) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  const globalIndex = allFiles.findIndex(
                    (file) => file.uri === fileUri
                  );
                  setCurrentImageIndex(globalIndex);
                  setIsVisible(true);
                }}
              >
                <Image
                  source={{ uri: fileUri }}
                  style={{ width: 175, height: 175, borderRadius: 10 }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(fileUri, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: `rgba(255, 255, 255, 0.2)`,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppBar
          top={40}
          left={15}
          right={20}
          title={task?.taskTitle || "Başlık Belirtilmedi"}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.plan}>
          <Image
            source={{ uri: task?.plan?.planImages }}
            style={{ width: 200, height: 150 }}
          />
          <View style={styles.info}>
            <ReusableText
              text={`${task?.plan?.planName} - ${task?.plan?.planCode}`}
              family={"medium"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          data={task?.messages}
          renderItem={renderItem}
          keyExtractor={(task) => task._id}
          contentContainerStyle={{ paddingBottom: 20 }} // Ekstra boşluk ekleyin
          style={styles.messagesList}
        />
      </ImageBackground>
      <View style={styles.inputContainer}>
        {isMessagesFileVisible && (
          <View style={styles.messagesFileContainer}>
            <MessagesFile
              onImageSelected={setSelectedImageUri}
              onImageSend={handleSendMessage}
            />
            <View
              style={{ width: 1, height: 40, backgroundColor: COLORS.blue }}
            />
            <TouchableOpacity onPress={toggleModalTaskPlan}>
              <Ionicons name="person-add" size={22} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => setIsMessagesFileVisible(!isMessagesFileVisible)}
          style={styles.toggleButton}
        >
          <Feather name="plus" size={24} color={COLORS.blue} />
        </TouchableOpacity>

        <TextInput
          style={styles.textbox}
          value={messageText}
          onChangeText={setMessageText}
          onSubmitEditing={handleTextSubmit}
        />
        {messageText === "" && (
          <CameraFile
            onImageSelected={(imageUri) => setSelectedImageUri(imageUri)}
            onImageSend={(imageUri) => handleSendMessage(imageUri, "")}
          />
        )}

        {messageText !== "" && (
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleSendMessage(selectedImageUri, messageText)}
          >
            <Feather name="send" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        )}
      </View>
      <ImageViewing
        images={allFiles}
        imageIndex={currentImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
      {isModalTaskPlanVisible && (
        <ModalSelectUser
          showFilters={isModalTaskPlanVisible}
          setShowFilters={setIsModalTaskPlanVisible}
          taskId={task?._id}
          onUserSelected={(selectedUser) => {
            handleSendMessage(null, null, selectedUser);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.lightWhite,
    zIndex: 1,
    width: SIZES.width,
    height: 85,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: COLORS.lightWhite,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 70,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  messagesList: {
    flex:1,
    margin: 10,
  },
  messageContainer: {
    backgroundColor: "hsla(220, 100%, 70%, 0.3)",
    padding: 8,
    marginVertical: 8,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignSelf: "flex-start",
  },
  messageText: {
    color: COLORS.black,
  },
  plan: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  info: {
    backgroundColor: COLORS.lightWhite,
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  messagesFileContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 20,
    top: -100,
    left: 5,
    backgroundColor: COLORS.lightWhite,
    height: 100,
    paddingHorizontal: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
    alignItems: "center",
  },
});

export default TaskDetails;
