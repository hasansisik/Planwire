import { View, Platform, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import { AppBar, HeightSpacer, ReusableText } from "../../../components";
import styles from "../../Pages/pages.style";
import ReusableSettings from "../../../components/Reusable/ReusableSettings";
import { COLORS, TEXT } from "../../../constants/theme";
import { PrivacyPolicy, TermsPolicy, CookiePolicy } from "../../Data/index";

const Politicy = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: COLORS.white },
        { top: Platform.OS === "ios" ? 0 : StatusBar.currentHeight },
      ]}
    >
      <View style={styles.header}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReusableText
          text={"Uygulama Politikaları"}
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.description}
        />
        <ReusableText
          text={"Politikalarımız"}
          family={"medium"}
          size={TEXT.xLarge}
          color={COLORS.black}
        />
      </View>

      <HeightSpacer height={50} />
      <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
        <ReusableText
          text={"Uygulama Politikaları"}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
        />
      </View>
      <View style={styles.settingsBox}>
        <ReusableSettings
          icon={"document-lock-outline"}
          title={"Gizlilik Politikası"}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: "Politikalar",
              title: "Gizlilik Politikası",
              text: PrivacyPolicy,
            });
          }}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"document-text-outline"}
          title={"Kullanım Koşulları"}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: "Politikalar",
              title: "Kullanım Koşulları",
              text: TermsPolicy,
            });
          }}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"documents-outline"}
          title={"Çerez Politikası"}
          onPress={() => {
            navigation.navigate("PoliticyPage", {
              header: "Politikalar",
              title: "Çerez Politikası",
              text: CookiePolicy,
            });
          }}
        />
      </View>
      <HeightSpacer height={30} />
    </SafeAreaView>
  );
};

export default Politicy;
