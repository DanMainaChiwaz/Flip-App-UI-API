import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "utils/theme-context";
import FlipText from "./flip-text";
import { format } from "date-fns";
import { getDayStamp } from "utils/helpers";
import { normalize } from "utils/helpers";

interface FlipSwipeableButtonProps {
  from: string;
  previewMessage: string;
  visible?: boolean;
  onDelete(): void;
  onMore(): any;
  onPress(): any;
  time: Date;
  newMessage: boolean;
  userProfilePicture: string;
  userProfileSecondPicture?: string;
}

export default function FlipSwipeableButton(props: FlipSwipeableButtonProps) {
  const { colors } = useContext(ThemeContext);

  const {
    onDelete,
    onMore,
    onPress,
    previewMessage,
    from,
    time,
    newMessage,
    userProfilePicture,
    userProfileSecondPicture,
  } = props;

  const renderRightActions = (progress, dragX, onPress) => {
    return (
      <View style={styles.deleteContainer}>
        <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: colors.secondary }]} onPress={onDelete}>
          <FontAwesome5 name="trash" size={24} color={colors.interactive} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: colors.secondary }]} onPress={onMore}>
          <FontAwesome5 name="ellipsis-h" size={24} color={colors.interactive} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onPress)}
        rightOpenValue={-100}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            { backgroundColor: pressed ? colors.foreground : colors.background, height: 85 },
            styles.swipeBtn,
          ]}
        >
          <View style={[styles.imageContainer, { marginTop: userProfileSecondPicture ? 15 : 0 }]}>
            {newMessage && <View style={[styles.badge, { backgroundColor: colors.accent }]} />}
            <Image
              style={[
                styles.swipePicture,
                { width: userProfileSecondPicture ? 50 : 65, height: userProfileSecondPicture ? 50 : 65 },
              ]}
              source={require("assets/icons/filler.png")}
            />
            {userProfileSecondPicture ? (
              <Image
                style={[
                  styles.swipePicture,
                  { position: "absolute", marginLeft: 15, bottom: 10, width: 50, height: 50 },
                ]}
                source={require("assets/icons/filler.png")}
              />
            ) : null}
          </View>
          <View style={[styles.swipeTextContainer, { paddingLeft: userProfileSecondPicture ? 15 : 10 }]}>
            <View style={styles.swipeTextHeaderContainer}>
              <FlipText type="Bold" style={[styles.swipeTextName, { color: colors.secondary }]}>
                {from}
              </FlipText>
              <FlipText type="Regular" style={[styles.swipeTextTime, { color: colors.secondary }]}>
                {getDayStamp(time) + " at " + format(new Date(time), "hh:mm aa")}
              </FlipText>
            </View>
            <Text numberOfLines={2} style={[styles.swipeTextMessage, { color: colors.secondary }]}>
              {previewMessage}
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={15} color="black" />
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  swipeBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  swipeTextContainer: {
    width: "80%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  swipeTextHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  swipePicture: { width: 65, height: 65, borderRadius: 65 / 2 },
  swipeTextMessage: {
    marginTop: 2,
    fontSize: normalize(14),
  },
  swipeTextName: {
    fontSize: normalize(16),
    marginRight: 5,
  },
  swipeTextTime: {
    fontSize: normalize(12),
  },
  deleteContainer: {
    margin: 0,
    alignContent: "center",
    flexDirection: "row",
    width: 140,
    height: 85,
  },
  deleteBtn: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {},
  badge: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    position: "absolute",
    zIndex: 1,
    elevation: 3,
  },
});
