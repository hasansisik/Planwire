import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";
import general from "../../components/general.style";
import { COLORS } from "../../constants/theme";
import { DailyInfo, Projects, WelcomeHeader } from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: COLORS.lightWhite }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.lightWhite}
        translucent={true}
      />
      <View
        style={[
          general.page,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        {/* Welcome Header */}
        <WelcomeHeader user={user}/>
        {/* Details */}
        <DailyInfo />
        {/* Project */}
        <Projects />
      </View>
    </SafeAreaView>
  );
};

export default Home;
