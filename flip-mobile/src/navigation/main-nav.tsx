import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNav from "./tab-nav";
import { ThemeContext } from "utils/theme-context";
import MessagesScreen from "screens/chat/messages-screen";
import SuggestedConnectionsScreen from "screens/find/suggested-connections-screen";
import EditProfileScreen from "screens/profile/edit-profile-screen";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { normalize } from "utils/helpers";
import { FontAwesome5 } from "@expo/vector-icons";
import DeleteAccount from "screens/settings/account-settings/delete-account";

const Stack = createStackNavigator();

const MainNav = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="TabNav"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS !== "ios" && true,
        headerTitleStyle: [styles.title, { color: colors.interactive }],
        headerTitleAlign: "center",
        headerStyle: [styles.header, { borderBottomColor: colors.tertiary, backgroundColor: "white" }],
      })}
    >
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="Suggested" component={SuggestedConnectionsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={({ navigation }) => ({
          headerTitle: "Deleting Account",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Proxima-Nova-Extrabold",
    fontSize: normalize(26),
  },
  header: {
    borderBottomWidth: 1,
    shadowColor: "transparent",
    elevation: 0,
  },
  backBtn: {
    marginLeft: 15,
  },
});
