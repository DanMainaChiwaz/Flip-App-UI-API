import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import FlipText from "./flip-text";
import { ThemeContext } from "utils/theme-context";
import { IActivity } from "reducers/user";
import { normalize } from "utils/helpers";

interface FlipActivityBadgeProps extends IActivity {
  onPress?: () => any;
}

function FlipActivityBadge(props: FlipActivityBadgeProps) {
  const { colors } = useContext(ThemeContext);

  const { name, skillLevel, playStyle, onPress } = props;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[colors.inactive, colors.background]}
      >
        <Image style={styles.image} source={require("assets/icons/filler.png")} />
        <FlipText style={[styles.title, { color: colors.secondary }]} type="Extrabold">
          {name}
        </FlipText>
        <View style={styles.detailsContainer}>
          <View
            style={[
              styles.detail,
              {
                borderColor: colors.foreground,
                backgroundColor: colors.background,
                ...styles.skill,
              },
            ]}
          >
            <FlipText
              style={{
                color: colors.foreground,
                fontSize: normalize(10),
              }}
              type="Regular"
            >
              {skillLevel}
            </FlipText>
          </View>
          <View
            style={[
              styles.detail,
              {
                borderColor: colors.foreground,
                backgroundColor: colors.background,
                ...styles.playStyle,
              },
            ]}
          >
            <FlipText
              style={{
                color: colors.foreground,
                fontSize: normalize(10),
              }}
              type="Regular"
            >
              {playStyle}
            </FlipText>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default FlipActivityBadge;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "45%",
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.35,
    marginBottom: 20,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 90,
    overflow: "hidden",
  },
  title: {
    marginVertical: 10,
    fontSize: normalize(12),
  },
  detailsContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  detail: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 0,
  },
  skill: {
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playStyle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  linearGradient: { width: "100%", alignItems: "center", padding: 25, borderRadius: 10, elevation: 5 },
});
