import { Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../general.style";
import ReusableText from "../../Reusable/ReusableText";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

const FormCard = ({ item }) => {
  const getFileNameFromUrl = (url) => {
    return url.split("/").pop().split("#")[0].split("?")[0];
  };

const downloadAndOpenPDF = async () => {
  try {
    const fileName = getFileNameFromUrl(item.document);
    const fileUri = FileSystem.documentDirectory + fileName; // "forms/" kısmı kaldırıldı
    const directoryUri = FileSystem.documentDirectory + "forms"; // Dizin yolu düzeltildi

    // Dizin var mı diye kontrol et
    const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
    if (!directoryInfo.exists) {
      // Dizin yoksa oluştur
      await FileSystem.makeDirectoryAsync(directoryUri, {
        intermediates: true,
      });
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      item.document,
      fileUri,
      {}
    );

    const { uri } = await downloadResumable.downloadAsync();
    Alert.alert(
      "Form Dosyası indirildi",
      "PDF dosyasını açmak ister misiniz?",
      [
        {
          text: "Aç",
          onPress: () => openPDF(uri),
        },
      ],
      { cancelable: true }
    );
  } catch (error) {
    console.error(error);
  }
};

  const openPDF = async (uri) => {
    try {
      const contentUri = await FileSystem.getContentUriAsync(uri);
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: contentUri,
        flags: 1,
        type: "application/pdf",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={downloadAndOpenPDF}>
      <View style={styles.container}>
        <View style={general.row("space-between", "flex-start")}>
          <View style={general.row("flex-start")}>
            {item.read && <View style={styles.readCircle} />}
            <ReusableText
              text={`#${item.number}`}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <ReusableText
              text={item.formCategory}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
          </View>
          <ReusableText
            text={new Date(item.createdAt).toLocaleDateString("tr-TR")}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.description}
          />
        </View>
        <View>
          <ReusableText
            text={item.formTitle}
            family={"bold"}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
        <View style={general.row("space-between")}>
          <View style={general.row("")}>
            <Image
              source={{ uri: item.formCreator.picture }}
              style={styles.image}
            />
            <View style={{ flexDirection: "column" }}>
              <ReusableText
                text={"Oluşturan:"}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
              <ReusableText
                text={item.formCreator.name}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
            </View>
          </View>
          <View style={general.row("")}>
            <Image
              source={{ uri: item.formPerson.picture }}
              style={styles.image}
            />
            <View style={{ flexDirection: "column" }}>
              <ReusableText
                text={"İmzalayan:"}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
              <ReusableText
                text={item.formPerson.name}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FormCard;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 40,
    borderRadius: 15,
    padding: 15,
    gap: 10,
    justifyContent: "space-between",
    borderColor: "#E7E7E7",
    borderWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: -10,
  },
  moreImages: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  readCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.blue,
  },
});
