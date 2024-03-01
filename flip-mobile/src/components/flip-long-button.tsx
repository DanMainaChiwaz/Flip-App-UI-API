import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import FlipText from "./flip-text";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "utils/theme-context";

interface FlipLongButtonProps {
  title: string;
  onPress: () => any;
}
const FlipLongButton = (props: FlipLongButtonProps) => {
  const { colors } = useContext(ThemeContext);

  const { title, onPress } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? colors.foreground : colors.background, borderColor: colors.tertiary },
        styles.longBtn,
      ]}
      onPress={onPress}
    >
      <FlipText type="Regular" style={{ color: colors.secondary }}>
        {title}
      </FlipText>
      <FontAwesome5 name="chevron-right" size={17} color={colors.secondary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  longBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 15,
    borderBottomWidth: 1,
    height: 60,
  },
});

export default FlipLongButton;
