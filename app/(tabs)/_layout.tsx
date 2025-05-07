import CustomBottomTabs from "@/navigation/customtab";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomBottomTabs {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post New Task",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Task"
        options={{
          title: "My Tasks",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
