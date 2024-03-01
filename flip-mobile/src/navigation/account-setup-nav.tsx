import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import LocationSetupScreen from "screens/account-setup/location-setup-screen";
import GenderSetupScreen from "screens/account-setup/gender-setup-screen";
import ActivitySetupScreen from "screens/account-setup/activity-setup-screen";
import { ThemeContext } from "utils/theme-context";
import { useContext } from "react";

const Stack = createStackNavigator();

const AccountSetupNav = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{ headerTitleStyle: [styles.title, { color: colors.interactive }], headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Gender" component={GenderSetupScreen} options={{ title: "Select Gender" }} />
      <Stack.Screen name="Location" component={LocationSetupScreen} options={{ title: "Pick A Location" }} />
      <Stack.Screen name="Activities" component={ActivitySetupScreen} options={{ title: "Choose Activities" }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Proxima-Nova-Extrabold",
    fontSize: 28,
  },
});

export default AccountSetupNav;
