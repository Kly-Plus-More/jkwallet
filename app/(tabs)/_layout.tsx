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
          title: "dashboard",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="analylitics"
        options={{
          title: "Analytics",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "categories",
          headerShown: false,
        }}
      />
      <Tabs.Screen
      name="transactions"
      options={{
        title: "transactions",
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
