import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, TEXT } from "../../../constants/theme";
import { storage } from "../../../config";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReusableText from "../../Reusable/ReusableText";

export default function ProjectLogoUpload({
  onUploadComplete,
  setUploadFunction,
}) {
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setUploadFunction(() => () => uploadImage(image, user));
  }, [image, user, setUploadFunction]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Üzgünüz, galeri erişim izni gerekiyor!");
        }
      }
    })();
  }, []);

  const uploadImage = async (uri, user) => {
    if (!uri) {
      return null;
    }
    const response = await fetch(uri);
    const blob = await response.blob();
    const date = new Date();
    const formattedDate = date.toISOString().split(".")[0].replace("T", "-");
    const filename = `${user.name}-${formattedDate}.jpg`;
    const storageRef = ref(storage, `PlanwireProject/${filename}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    onUploadComplete(url);
    return url;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result && !result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FCFCFC",
          borderColor: COLORS.lightGrey,
          borderWidth: 1,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ReusableText
            text={"Galeriden Seçmek İçin Tıkla"}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <Image
          source={{ uri: image }}
          style={{ width: 75, height: 75, marginTop: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}
