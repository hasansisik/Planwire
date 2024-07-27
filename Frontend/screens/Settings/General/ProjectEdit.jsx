import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, TEXT } from "../../../constants/theme";
import { AppBar, HeightSpacer, ReusableText } from "../../../components";
import styles from "../settings.style";
import general from "../../../components/general.style";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import NoticeMessage from "../../../components/Reusable/NoticeMessage";

const ProjectEdit = ({ navigation }) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const { projects } = useSelector((state) => state.projects);
  
  const dropdownData = projects.map((project) => ({
    projectId: project._id,
    projectName: project.projectName,
    projectCode: project.projectCode,
    address: project.address,
  }));

  const [value, setValue] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedProjectCode, setSelectedProjectCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

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
          text={"Proje Seçin"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <View
          style={{
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
            paddingVertical: 20,
          }}
        >
          <Dropdown
            data={dropdownData}
            labelField="projectName"
            valueField="id"
            value={value}
            onChange={(item) => {
              setValue(item.projectId);
              setSelectedProjectName(item.projectName);
              setSelectedProjectCode(item.projectCode);
              setSelectedAddress(item.address);
            }}
            placeholder="Proje Seçin"
            touchableWrapperProps={{
              activeOpacity: 1, // Bileşene tıklandığında opaklık değişimi olmaz
            }}
          />
        </View>
        <HeightSpacer height={50} />
        <ReusableText
          text={"Proje Bilgileri"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        {/* ProjectName */}
        <TouchableOpacity
          onPress={() => {
            if (selectedProjectName) {
              navigation.navigate("ProjectName", {
                projectId: value,
              });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={styles.info}
        >
          <ReusableText
            text={"Proje Adı"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={selectedProjectName || "Proje seçilmedi"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* ProjectCode */}
        <TouchableOpacity
          onPress={() => {
            if (selectedProjectCode) {
              navigation.navigate("ProjectCode", { projectId: value });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
          style={styles.info}
        >
          <ReusableText
            text={"Proje Kodu"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={selectedProjectCode || "Proje seçilmedi"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
        {/* ProjectAddress */}
        <TouchableOpacity
          onPress={() => {
            if (selectedAddress) {
              navigation.navigate("ProjectAdress", { projectId: value });
            } else {
              setStatus("error");
              setMessage("Lütfen Proje Seçin");
              setTimeout(() => setStatus(null), 3000);
            }
          }}
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
              text={selectedAddress || "Proje seçilmedi"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>

        <HeightSpacer height={50} />
        <ReusableText
          text={"Birimler"}
          family={"medium"}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <View style={styles.info}>
          <ReusableText
            text={"Zaman Dilimi"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={"GMT+3:00 Türkiye Saati"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </View>
        <View style={styles.info}>
          <ReusableText
            text={"Para Birimi"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={"TRY"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
        </View>
        <View style={styles.info}>
          <ReusableText
            text={"Dil"}
            family={"regular"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <View style={general.row("")}>
            <ReusableText
              text={"Türkçe"}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.description}
            />
            <Feather name="chevron-right" size={20} />
          </View>
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
      {status && <NoticeMessage status={status} message={message} />}
    </SafeAreaView>
  );
};

export default ProjectEdit;
