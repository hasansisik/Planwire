import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";
import general from "../../../components/general.style";
import { COLORS, TEXT } from "../../../constants/theme";
import { AppBar, HeightSpacer, ReusableText } from "../../../components";
import styles from "../settings.style";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";

const Notification = ({ navigation }) => {
     const [isSwitchOn, setIsSwitchOn] = React.useState(false);
     const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: COLORS.white },
        { top: Platform.OS === "ios" ? 0 : StatusBar.currentHeight },
      ]}
    >
      <View style={general.page}>
        <AppBar
          top={25}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={75} />
        <ReusableText
          text={"Bilidirim Ayarları"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <View style={styles.info}>
          <View style={general.row("")}>
            <View style={styles.icon}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <View>
              <ReusableText
                text={"Bildirim"}
                family={"regular"}
                size={TEXT.small}
                color={COLORS.black}
              />
              <ReusableText
                text={"Gelen bildirimleri aç/kapat"}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
            </View>
          </View>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={COLORS.blue}
          />
        </View>
        <View style={styles.info}>
          <View style={general.row("")}>
            <View style={styles.icon}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
            </View>
            <View>
              <ReusableText
                text={"SMS Bildirimleri"}
                family={"regular"}
                size={TEXT.small}
                color={COLORS.black}
              />
              <ReusableText
                text={"SMS bildirimlerini aç/kapat"}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
            </View>
          </View>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={COLORS.blue}
          />
        </View>
        <View style={styles.info}>
          <View style={general.row("")}>
            <View style={styles.icon}>
              <Ionicons
                name="mail-unread-outline"
                size={24}
                color="black"
              />
            </View>
            <View>
              <ReusableText
                text={"E-posta Bildirimleri"}
                family={"regular"}
                size={TEXT.small}
                color={COLORS.black}
              />
              <ReusableText
                text={"E-posta bildirimlerini aç/kapat"}
                family={"regular"}
                size={TEXT.xSmall}
                color={COLORS.description}
              />
            </View>
          </View>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={COLORS.blue}
          />
        </View>
        <View style={styles.bottom}>
          <Text
            style={{
              fontFamily: "regular",
              fontSize: TEXT.xSmall,
              color: COLORS.description,
              textAlign: "center",
            }}
          >
            {"bir sorun var ise "}
            <Text style={{ color: COLORS.blue }}>{"destek@planwire.app"}</Text>
            {" e-posta adresinden bizimle iletişime geçebilirsiniz."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
