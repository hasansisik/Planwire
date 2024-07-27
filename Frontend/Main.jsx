import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
//nagivation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//screens
import {
  Onboarding,
  CompanyLogin,
  Auth,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Verify,
  Home,
  Tasks,
  Files,
  Profile,
  PlanDetails,
  TaskDetails,
  ProfileEdit,
  ProjectEdit,
  Notification,
  Politicy,
  Helpers,
  UserName,
  UserJob,
  UserPassword,
  UserAdress,
  UserMail,
  MailVerify,
  UserNumber,
  UserCompany,
  ProjectName,
  ProjectCode,
  ProjectAdress,
  PoliticyPage,
  HelperFaq,
  PlanSearch,
  TaskSearch,
  Form,
  ChatMain,
} from "./screens/index.js";
//navigatin
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(false);

  useEffect(() => {
    const checkCompanyLogin = async () => {
      const companyId = await AsyncStorage.getItem("companyId");
      if (companyId) {
        setIsCompanyLoggedIn(true);
      }
    };
    checkCompanyLogin();
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user);
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const [fontLoaded] = useFonts({
    light: require("./assets/fonts/light.otf"),
    regular: require("./assets/fonts/regular.otf"),
    medium: require("./assets/fonts/medium.otf"),
    bold: require("./assets/fonts/bold.otf"),
    xtrabold: require("./assets/fonts/xtrabold.otf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <Stack.Screen
            name="Onboard"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        ) : !user || isEmpty(user) ? (
          <>
            {!isCompanyLoggedIn && (
              <Stack.Screen
                name="CompanyLogin"
                component={CompanyLogin}
                options={{ headerShown: false }}
              />
            )}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CompanyLoginAgain"
              component={CompanyLogin}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Tasks"
              component={Tasks}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Files"
              component={Files}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlanDetails"
              component={PlanDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileEdit"
              component={ProfileEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProjectEdit"
              component={ProjectEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Politicy"
              component={Politicy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Helpers"
              component={Helpers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserName"
              component={UserName}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserJob"
              component={UserJob}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserPassword"
              component={UserPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserAdress"
              component={UserAdress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserMail"
              component={UserMail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MailVerify"
              component={MailVerify}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserNumber"
              component={UserNumber}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserCompany"
              component={UserCompany}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProjectName"
              component={ProjectName}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProjectCode"
              component={ProjectCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProjectAdress"
              component={ProjectAdress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PoliticyPage"
              component={PoliticyPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HelperFaq"
              component={HelperFaq}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlanSearch"
              component={PlanSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TaskSearch"
              component={TaskSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Form"
              component={Form}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatMain"
              component={ChatMain}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
