import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loadAsync } from "expo-font";
import { Amplify } from "@aws-amplify/core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { AppDispatch, RootState } from "store";
import { ThemeContext, themes } from "utils/theme-context";
import AuthNav from "./navigation/auth-nav";
import MainNav from "navigation/main-nav";

import awsConfig from "./aws-exports";
import { registerAuthListeners } from "utils/auth-listeners";

Amplify.configure(awsConfig);

const fonts = {
  "Proxima-Nova-Alt-Bold": require("assets/fonts/Proxima-Nova-Alt-Bold.otf"),
  "Proxima-Nova-Alt-Light": require("assets/fonts/Proxima-Nova-Alt-Light.otf"),
  "Proxima-Nova-Alt-Thin": require("assets/fonts/Proxima-Nova-Alt-Thin.otf"),
  "Proxima-Nova-Black": require("assets/fonts/Proxima-Nova-Black.otf"),
  "Proxima-Nova-Bold": require("assets/fonts/Proxima-Nova-Bold.otf"),
  "Proxima-Nova-Extrabold": require("assets/fonts/Proxima-Nova-Extrabold.otf"),
  "Proxima-Nova-Regular": require("assets/fonts/Proxima-Nova-Regular.otf"),
  "Proxima-Nova-Thin": require("assets/fonts/Proxima-Nova-Thin.otf"),
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.auth);
  const [appIsReady, setAppIsReady] = useState(false);

  const selectedTheme = themes.light; //useColorScheme(); "light" | "dark" | null
  const theme = {
    dark: false,
    colors: {
      background: selectedTheme.colors.background,
      primary: "",
      card: "",
      text: "",
      border: "",
      notification: "",
    },
  };

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync(fonts);
        await registerAuthListeners(dispatch);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  const getNav = () => {
    if (!user.isVerified) {
      return <AuthNav />;
    } else if (!user.isConfigured) {
      return <MainNav />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: selectedTheme.colors.background,
      }}
    >
      <ThemeContext.Provider value={selectedTheme}>
        <NavigationContainer theme={theme}>{getNav()}</NavigationContainer>
        <StatusBar backgroundColor={selectedTheme.colors.background} barStyle={"dark-content"} />
      </ThemeContext.Provider>
    </View>
  );
};

const AreaSafeApp = () => (
  <SafeAreaProvider>
    <RootSiblingParent>
      <App />
    </RootSiblingParent>
  </SafeAreaProvider>
);

export default AreaSafeApp;
