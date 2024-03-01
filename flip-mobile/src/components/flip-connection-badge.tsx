import React from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "utils/theme-context";
import { IConnection } from "reducers/connection";
import FlipText from "./flip-text";
import { normalize } from "utils/helpers";

interface FlipConnectionBadgeProps extends IConnection {
  onPress?: () => any;
  onDelete?: () => any;
  mutualCount?: number;
}

function FlipConnectionBadge(props: FlipConnectionBadgeProps) {
  const { colors } = useContext(ThemeContext);

  const { firstName, lastName, lastActivity, mutualCount, friend, onPress, onDelete } = props;

  return (
    <Pressable onPress={onPress} style={styles.profile}>
      <Image style={styles.profileImage} source={require("assets/icons/filler.png")} />
      <View style={[styles.profileSummary, { backgroundColor: colors.secondary }]}>
        <FlipText type="Bold" style={[styles.profileName, { color: colors.background }]}>
          {firstName} {lastName}
        </FlipText>
        <FlipText type="Regular" style={[styles.profileMutual, { color: colors.background }]}>
          {friend ? lastActivity : mutualCount + " Mutual Interests"}
        </FlipText>
      </View>
      <TouchableOpacity style={styles.removeProfileIcon} onPress={onDelete}>
        <Icon name="times-circle" size={20} color={colors.secondary} />
      </TouchableOpacity>
    </Pressable>
  );
}

export default FlipConnectionBadge;

const styles = StyleSheet.create({
  profile: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  removeProfileIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  profileImage: {
    width: 110,
    height: 125,
  },
  profileSummary: {
    padding: 5,
  },
  profileName: { textAlign: "center", fontSize: normalize(14) },
  profileMutual: { textAlign: "center", fontSize: normalize(10) },
});
