import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Plans, Tasks, Files, Form } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.lightWhite,
  paddingTop: 10,
  paddingBottom: 20,
  height: 75,
  position: "absolute",
};

const BottomTabNavigation = () => {
  const route = useRoute();
  const projectId = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Plans"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Plans"
        component={Plans}
        initialParams={{ projectId }}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "PLANLAR",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        initialParams={{ projectId }}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "GÖREVLER",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={Form}
        initialParams={{ projectId }}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "FORM",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "document-attach" : "document-attach-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Files"
        component={Files}
        initialParams={{ projectId }}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "DOSYALAR",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "folder-open" : "folder-open-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
