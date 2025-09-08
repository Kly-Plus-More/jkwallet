import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

// Budget app specific icons
const ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (color: string) => (
    <Ionicons name="home-outline" size={24} color={color} />
  ),
  analytics: (color: string) => (
    <Ionicons name="analytics-outline" size={24} color={color} />
  ),
  categories: (color: string) => (
    <Ionicons name="add-circle-outline" size={32} color={color} />
  ),
  transactions: (color: string) => (
    <Ionicons name="list-outline" size={24} color={color} />
  ),
  settings: (color: string) => (
    <Ionicons name="settings-outline" size={24} color={color} />
  ),
};

const FOCUSED_ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (color: string) => <Ionicons name="home" size={24} color={color} />,
  analytics: (color: string) => (
    <Ionicons name="analytics" size={24} color={color} />
  ),
  categories: (color: string) => (
    <Ionicons name="add-circle" size={32} color={color} />
  ),
  transactions: (color: string) => (
    <Ionicons name="list" size={24} color={color} />
  ),
  settings: (color: string) => (
    <Ionicons name="settings" size={24} color={color} />
  ),
};

const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => (
  <View
    style={{
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 20,
      flexDirection: "row",
      height: 80,
      backgroundColor: Colors.light.surface,
      borderRadius: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 12,
      paddingHorizontal: 12,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.light.borderLight,
    }}
  >
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        typeof options.tabBarLabel === "string"
          ? options.tabBarLabel
          : typeof options.title === "string"
          ? options.title
          : route.name;
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const iconName = isFocused
        ? FOCUSED_ICONS[route.name] || ICONS[route.name]
        : ICONS[route.name];

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: isFocused ? Colors.light.primary : "transparent",
            borderRadius: 20,
            paddingVertical: 12,
            paddingHorizontal: 8,
            minHeight: 60,
          }}
          activeOpacity={0.7}
        >
          {typeof iconName === "function" ? (
            iconName(isFocused ? "#ffffff" : Colors.light.tabIconDefault)
          ) : (
            <Ionicons
              name={iconName as any}
              size={24}
              color={isFocused ? "#ffffff" : Colors.light.tabIconDefault}
            />
          )}

          <Text
            style={{
              color: isFocused ? "#ffffff" : Colors.light.textSecondary,
              fontSize: 11,
              marginTop: 4,
              fontWeight: isFocused ? "600" : "400",
              textAlign: "center",
            }}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default CustomBottomTabs;
