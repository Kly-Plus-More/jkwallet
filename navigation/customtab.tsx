import {
  AntDesign,
  FontAwesome6,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

// In your ICONS object, change the Post icon to:
const ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (color: string) => <FontAwesome name="home" size={24} color={color} />,
  post: (color: string) => <Entypo name="plus" size={40} color={color} />,
  Task: (color: string) => <Feather name="clipboard" size={24} color={color} />,
  settings: (color: string) => (
    <Feather name="settings" size={24} color={color} />
  ),
};

const FOCUSED_ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (color: string) => <Fontisto name="home" size={24} color={color} />,
  Task: (color: string) => (
    <Ionicons name="clipboard" size={24} color={color} />
  ),
  post: (color: string) => <AntDesign name="plus" size={24} color={color} />,
  settings: (color: string) => (
    <FontAwesome6 name="gear" size={24} color={color} />
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
      height: 70,
      backgroundColor: "#fff",
      borderRadius: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      paddingHorizontal: 8,
      justifyContent: "space-between",
      alignItems: "center",
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

      // Use real Ionicons for each tab
      const iconName = isFocused
        ? FOCUSED_ICONS[route.name] || "ellipse"
        : ICONS[route.name] || "ellipse-outline";

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row", // horizontal
            backgroundColor: isFocused ? "#800000" : "transparent",
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 1,
          }}
          activeOpacity={0.7}
        >
          {typeof iconName === "function" ? (
            iconName(isFocused ? "white" : "gray")
          ) : (
            <Ionicons
              name={iconName as any}
              size={24}
              color={isFocused ? "white" : "gray"}
            />
          )}

          {isFocused && (
            <Text
              style={{
                color: "white",
                fontSize: 12,
                marginLeft: 6,
                fontWeight: "bold",
              }}
            >
              {label}
            </Text>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

export default CustomBottomTabs;
