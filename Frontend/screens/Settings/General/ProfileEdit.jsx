import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, TEXT } from "../../../constants/theme";
import {
  AppBar,
  HeightSpacer,
  ReusableText,
  WidthSpacer,
} from "../../../components";
import styles from "../settings.style";
import general from "../../../components/general.style";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { loadUser } from "../../../redux/actions/userActions";

const ProfileEdit = ({ navigation }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadUser());
    }, [dispatch])
  );
  const { user } = useSelector((state) => state.user);

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
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
          text={"Kişisel Bilgiler"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        {/* UserName */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserName")}
          style={styles.info}
        >
          <ReusableText
            text={"Kullanıcı Adı"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.name || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* UserJob */}
        <TouchableOpacity style={styles.info}>
          <ReusableText
            text={"İş Pozisyonu"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.jobTitle || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <WidthSpacer width={15} />
          </View>
        </TouchableOpacity>
        {/* UserAddress */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserAdress")}
          style={styles.info}
        >
          <ReusableText
            text={"Adres"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.address || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* UserCompany */}
        <TouchableOpacity style={styles.info}>
          <ReusableText
            text={"Şirket Adı"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.company.CompanyName || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <WidthSpacer width={15} />
          </View>
        </TouchableOpacity>
        <HeightSpacer height={50} />
        <ReusableText
          text={"Güvenlik ve İletişim Bilgileri"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        {/* UserPassword */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserPassword")}
          style={styles.info}
        >
          <ReusableText
            text={"Şifre"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={"*********"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* UserNumber */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserNumber")}
          style={styles.info}
        >
          <ReusableText
            text={"Telefon Numarası"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.phoneNumber || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* UserMail */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserMail")}
          style={styles.info}
        >
          <ReusableText
            text={"Mail Adresi"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={user.email || "Belirtilmemiş"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>

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

export default ProfileEdit;
