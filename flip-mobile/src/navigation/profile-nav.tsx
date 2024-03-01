import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "screens/profile/profile-screen";
import FriendProfileScreen from "screens/profile/friend-profile-screen";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GeneralSettings from "screens/settings/general-settings";
import AccountSetting from "screens/settings/account-settings/account-setting";
import EmailSetting from "screens/settings/account-settings/email-setting";
import CloseAccountSetting from "screens/settings/account-settings/close-account-setting";
import BlockedConnectionsSetting from "screens/settings/account-settings/blocked-connections-setting";
import NotificationsSetting from "screens/settings/notifications-settings/notifications-setting";
import HelpSetting from "screens/settings/help-settings/help-setting";
import PhoneNumberScreen from "screens/settings/account-settings/phone-number-setting/phone-number-screen";
import PasswordSettingScreen from "screens/settings/account-settings/password-setting";

const Stack = createStackNavigator();

const ProfileNav = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: Platform.OS !== "ios" && true,
        headerTitleStyle: [styles.title, { color: colors.interactive }],
        headerTitleAlign: "center",
        headerStyle: [styles.header, { borderBottomColor: colors.tertiary }],
      })}
    >
      <Stack.Screen name="My Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Settings"
        component={GeneralSettings}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={({ navigation }) => ({
          headerTitle: "Account",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EmailSetting"
        component={EmailSetting}
        options={({ navigation }) => ({
          headerTitle: "Email",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CloseAccountSetting"
        component={CloseAccountSetting}
        options={({ navigation }) => ({
          headerTitle: "Close Account",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="BlockedConnectionsSetting"
        component={BlockedConnectionsSetting}
        options={({ navigation }) => ({
          headerTitle: "Blocked Connections",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationsSetting}
        options={({ navigation }) => ({
          headerTitle: "Notification",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="HelpSetting"
        component={HelpSetting}
        options={({ navigation }) => ({
          headerTitle: "Help",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PhoneNumberSetting"
        component={PhoneNumberScreen}
        options={({ navigation }) => ({
          headerTitle: "Phone Number",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PasswordSetting"
        component={PasswordSettingScreen}
        options={({ navigation }) => ({
          headerTitle: "Password",
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

export default ProfileNav;

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
