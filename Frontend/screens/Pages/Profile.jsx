import {
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../constants/theme";
import { AppBar, HeightSpacer, ReusableText } from "../../components";
import styles from "./pages.style";
import general from "../../components/general.style.js";
import ReusableSettings from "../../components/Reusable/ReusableSettings";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
    navigation.navigate("CompanyLoginAgain");
  };

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
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
      <View style={{ paddingHorizontal: 25 }}>
        <ReusableText
          text={"Proje"}
          family={"regular"}
          size={TEXT.xLarge}
          color={COLORS.description}
        />
        <ReusableText
          text={"Ayarları"}
          family={"medium"}
          size={TEXT.xxLarge}
          color={COLORS.black}
        />
      </View>
      <HeightSpacer height={25} />
      <View style={styles.profile}>
        {/* Profile Image */}
        <Image
          source={{
            uri: user?.picture
              ? user?.picture
              : "https://cdn-icons-png.freepik.com/512/8188/8188362.png",
          }}
          style={styles.image}
        />
        <HeightSpacer height={5} />
        <View style={styles.name}>
          <ReusableText
            text={user?.name ? `${user?.name}` : "Misafir"}
            family={"bold"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={user?.email ? `${user?.email}` : "mail@misafir.com"}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
      </View>
      <HeightSpacer height={30} />
      {!user ? null : (
        <>
          <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
            <ReusableText
              text={"Genel"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
          </View>
          <View style={styles.settingsBox}>
            <ReusableSettings
              icon={"person-outline"}
              title={"Profili Düzenle"}
              onPress={() => navigation.navigate("ProfileEdit")}
            />
            <View
              style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }}
            />
            <ReusableSettings
              icon={"clipboard-outline"}
              title={"Projeyi Düzenle"}
              onPress={() => navigation.navigate("ProjectEdit")}
            />
          </View>
        </>
      )}
      <HeightSpacer height={30} />
      <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
        <ReusableText
          text={"Politikalar ve Yardım"}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.description}
        />
      </View>
      <View style={styles.settingsBox}>
        <ReusableSettings
          icon={"notifications-outline"}
          title={"Bildirimler"}
          onPress={() => navigation.navigate("Notification")}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"trail-sign-outline"}
          title={"Yardım ve Destek"}
          onPress={() => navigation.navigate("Helpers")}
        />
        <View style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }} />
        <ReusableSettings
          icon={"clipboard-outline"}
          title={"Politikalar ve Gizlilik"}
          onPress={() => navigation.navigate("Politicy")}
        />
      </View>
      <HeightSpacer height={40} />
      {!user ? (
        <View style={styles.settingsBox}>
          <ReusableSettings
            icon={"log-in-outline"}
            title={"Giriş Yap"}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      ) : (
        <View style={styles.settingsBox}>
          <ReusableSettings
            icon={"log-out-outline"}
            title={"Çıkış Yap"}
            onPress={logoutHandler}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
