import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import ChatScreen from "screens/chat/chat-screen";
import FindScreen from "screens/find/find-screen";
import { ThemeContext } from "utils/theme-context";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { normalize } from "utils/helpers";
import ProfileNav from "./profile-nav";
import HomeNav from "./home-nav";

const Tab = createBottomTabNavigator();

const iconSettings = (route: RouteProp<ParamListBase, string>, props) => {
  const { focused, color, size } = props;
  // let iconName: FlipIconName;
  let iconName;

  switch (route.name) {
    case "HomeNav":
      iconName = "home";
      // iconName = FlipIconName.Home;
      break;
    case "FindConnections":
      iconName = "users";
      // iconName = FlipIconName.Connections;
      break;
    case "Chat":
      iconName = "comment-dots";
      // iconName = FlipIconName.Chat;
      break;
    case "ProfileNav":
      iconName = "user-alt";
      // iconName = FlipIconName.Profile;
      break;
  }

  return <FontAwesome5 color={color} size={32} name={iconName} />;
};

const TabNav = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: Platform.OS !== "ios" && true,
        headerTitleStyle: [styles.title, { color: colors.interactive }],
        headerTitleAlign: "center",
        tabBarIcon: (props) => iconSettings(route, props),
        tabBarActiveTintColor: colors.interactive,
        tabBarInactiveTintColor: colors.primary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: [styles.tabBar, { backgroundColor: colors.secondary }],
        headerStyle: [styles.header, { borderBottomColor: colors.tertiary }],
      })}
    >
      <Tab.Screen name="HomeNav" component={HomeNav} options={{ headerShown: false, title: "Home" }} />
      <Tab.Screen
        name="FindConnections"
        component={FindScreen}
        options={{
          title: "Connections",
          headerTitle: "Find Connections",
          headerRight: () => (
            <TouchableOpacity style={styles.rightBtn}>
              <FontAwesome5 name="align-justify" size={normalize(24)} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerTitle: "Messages",
          headerRight: () => (
            <TouchableOpacity style={styles.rightBtn}>
              <FontAwesome5 name="edit" size={normalize(24)} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="ProfileNav" component={ProfileNav} options={{ headerShown: false, title: "Profile" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Proxima-Nova-Extrabold",
    fontSize: normalize(26),
  },
  rightBtn: {
    marginRight: 15,
  },
  header: {
    borderBottomWidth: 1,
    shadowColor: "transparent",
    elevation: 0,
  },
  tabBar: {
    borderTopWidth: 0,
    height: Platform.OS === "ios" ? 100 : 70,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: normalize(12),
    top: Platform.OS === "ios" ? 5 : 0,
    marginBottom: 5,
    width: "100%",
    fontFamily: "Proxima-Nova-Regular",
  },
});

export default TabNav;
