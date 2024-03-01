import { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { FlipText } from "components";
import { RootState } from "store";
import { ThemeContext } from "utils/theme-context";
import MyConnections from "./my-connections-screen";
import SuggestedConnections from "./suggested-connections-screen";

const Find = () => {
  const { colors } = useContext(ThemeContext);
  const { connections } = useSelector((store: RootState) => store.connection);
  const [currentScreen, setCurrentScreen] = useState<string>("Suggested Connections");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.navContainer}>
        <Pressable
          style={[
            styles.nav,
            styles.navLeft,
            {
              borderColor: colors.secondary,
              backgroundColor: currentScreen === "Suggested Connections" ? colors.secondary : "white",
            },
          ]}
          onPress={() => setCurrentScreen("Suggested Connections")}
        >
          <FlipText
            style={{ color: currentScreen === "Suggested Connections" ? colors.background : colors.secondary }}
            type="Regular"
          >
            Suggested Connections
          </FlipText>
        </Pressable>
        <Pressable
          onPress={() => setCurrentScreen("My Connections")}
          style={[
            styles.nav,
            styles.navRight,
            {
              backgroundColor: currentScreen === "My Connections" ? colors.secondary : "white",
              borderColor: colors.secondary,
            },
          ]}
        >
          <FlipText
            style={{ color: currentScreen === "My Connections" ? colors.background : colors.secondary }}
            type="Regular"
          >
            My Connections ({connections.length})
          </FlipText>
        </Pressable>
      </View>
      {currentScreen === "My Connections" ? <MyConnections /> : <SuggestedConnections />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  nav: {
    paddingVertical: 7,
    width: "100%",
  },
  navLeft: {
    borderWidth: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  navRight: {
    borderWidth: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  search: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  scroll: {
    paddingTop: 20,
  },
});

export default Find;
