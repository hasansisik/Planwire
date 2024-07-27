import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import { Feather, AntDesign } from "@expo/vector-icons";
import ReusableText from "../../Reusable/ReusableText";

export default function CameraFile({ onImageSelected, onImageSend }) {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Üzgünüz, kamera erişim izni gerekiyor!");
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result && !result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setModalVisible(true);
    }
  };

  const handleImageSelected = () => {
    onImageSelected(image);
    setModalVisible(false);
    onImageSend(image);
  };

  const handleClose = () => {
    setImage(null);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={takePicture}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 35,
        }}
      >
        <Feather name="camera" size={24} color={COLORS.blue} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
          <View style={{ alignItems: "center", gap: 20 }}>
            <Image
              source={{ uri: image }}
              style={{ width: SIZES.width, height: SIZES.height / 1.05 }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 15,
                gap: 10,
                flexDirection: "row",
              }}
              onPress={handleImageSelected}
            >
              <ReusableText
                text={`Seçilen Fotoğrafı Gönder`}
                family={"medium"}
                size={TEXT.xSmall}
                color={COLORS.white}
              />
              <Feather name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.width - 30,
            }}
          >
            <TouchableOpacity
              onPress={handleClose}
              style={{
                backgroundColor: COLORS.blue,
                padding: 10,
                borderRadius: 20,
                width: 40,
              }}
            >
              <AntDesign name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
