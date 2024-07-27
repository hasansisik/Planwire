import { View, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity ,StyleSheet} from 'react-native'
import React, { useRef } from 'react'
import { AppBar, ReusableText, HeightSpacer } from "../../../components";
import { COLORS, TEXT } from '../../../constants/theme';
import general from "../../../components/general.style"
import { Feather } from '@expo/vector-icons';

const PoliticyPage = ({ navigation, route, }) => {
  const { text, title, header } = route.params;
  const scrollViewRef = useRef(); 

  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      {/* Header */}
      <View style={general.page}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={50} />
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReusableText
            text={header}
            family={"regular"}
            size={TEXT.medium}
            color={COLORS.description}
          />
          <ReusableText
            text={title}
            family={"medium"}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <HeightSpacer height={25} />

          <ScrollView style={styles.content} ref={scrollViewRef}>
            <ReusableText
              text={text}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.black}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.bottom}
          onPress={() =>
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          <Feather name="chevron-up" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PoliticyPage;

const styles = StyleSheet.create({
  content: {
    marginBottom: 55,
  },
  bottom: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 15,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    height: 40,
    width: 80,
    borderRadius: 20,
  },
});