import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsItems = [
    {
      icon: "account" as const,
      title: "Account Settings",
      section: "account",
      route: "/account" as const,
    },
    {
      icon: "bell-outline" as const,
      title: "Notifications",
      section: "notifications",
      toggle: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: "lock-outline" as const,
      title: "Security",
      section: "security",
      toggle: true,
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      icon: "currency-usd" as const,
      title: "Currency",
      section: "currency",
      route: "/currency" as const,
    },
    {
      icon: "theme-light-dark" as const,
      title: "Dark Mode",
      section: "theme",
      toggle: true,
      value: darkMode,
      onToggle: setDarkMode,
    },
    {
      icon: "translate" as const,
      title: "Language",
      section: "language",
      route: "/language" as const,
    },
    {
      icon: "lifebuoy" as const,
      title: "Support",
      section: "support",
      route: "/support" as const,
    },
    {
      icon: "information-outline" as const,
      title: "About",
      section: "about",
      route: "/about" as const,
    },
    {
      icon: "logout" as const,
      title: "Sign Out",
      section: "logout",
      route: "/logout" as const,
      color: "#F44336",
    },
  ];

  return (
    <LinearGradient
      colors={darkMode ? ["#121212", "#1E1E1E"] : ["#f5f7fa", "#c3cfe2"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={() => router.push("/account")}
          >
            <LinearGradient
              colors={["#4a90e2", "#2a5298"]}
              style={styles.profileImageGradient}
            >
              <MaterialCommunityIcons name="account" size={80} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={[styles.profileName, darkMode && styles.darkText]}>
            John Doe
          </Text>
          <Text style={[styles.profileEmail, darkMode && styles.darkSubtext]}>
            john.doe@example.com
          </Text>
        </View>

        {/* Settings List */}
        <View style={[styles.sectionCard, darkMode && styles.darkCard]}>
          {settingsItems.map((item, index) => (
            <View key={item.section}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => {
                  if (item.toggle) {
                    item.onToggle?.(!item.value);
                  } else if (item.route) {
                    router.push(item.route);
                  }
                }}
              >
                <View style={styles.itemLeft}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={item.color || (darkMode ? "#fff" : "#4a90e2")}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.itemText, darkMode && styles.darkText]}>
                    {item.title}
                  </Text>
                </View>
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    thumbColor={item.value ? "#fff" : "#f5f5f5"}
                    trackColor={{ true: "#4a90e2", false: "#767577" }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={darkMode ? "#666" : "#aaa"}
                  />
                )}
              </TouchableOpacity>
              {index < settingsItems.length - 1 && (
                <View
                  style={[styles.divider, darkMode && styles.darkDivider]}
                />
              )}
            </View>
          ))}
        </View>

        {/* App Version & Support */}
        <View style={styles.footer}>
          <Text style={[styles.versionText, darkMode && styles.darkSubtext]}>
            JK Wallet v1.0.0
          </Text>
          <TouchableOpacity style={styles.contactSupport}>
            <MaterialCommunityIcons name="headset" size={20} color="#4a90e2" />
            <Text style={[styles.contactText, darkMode && styles.darkSubtext]}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20, // Add padding to the bottom of the scroll view
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    marginBottom: 15,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImageGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  darkCard: {
    backgroundColor: "#2D2D2D",
    shadowColor: "#000",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    fontSize: 17,
    marginLeft: 18,
    color: "#333",
    fontWeight: "500",
  },
  darkText: {
    color: "#fff",
  },
  darkSubtext: {
    color: "#aaa",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  darkDivider: {
    backgroundColor: "#444",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  versionText: {
    color: "#666",
    fontSize: 14,
  },
  contactSupport: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
});
