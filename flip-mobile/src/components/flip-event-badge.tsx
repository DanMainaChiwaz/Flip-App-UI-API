import React, { useContext } from "react";
import { View, Image, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { ThemeContext } from "utils/theme-context";
import FlipText from "./flip-text";
import FlipButton from "./flip-button";
import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import { IEvent } from "store/reducers/home";
import { normalize, nth } from "utils/helpers";

interface FlipEventBadgeProps {
  sender?: boolean;
  onAccept?(): any;
  onDecline?(): void;
  onPress?(): any;
  item?: IEvent;
  secondary?: boolean;
  style?: StyleProp<ViewStyle>;
  noIcon?: boolean;
}

function FlipEventBadge(props: FlipEventBadgeProps) {
  const { colors } = useContext(ThemeContext);

  const { sender, onAccept, onDecline, onPress, item, secondary, style, noIcon } = props;

  const { title, status, startTime, endTime, connections } = item;

  const dateEvent = new Date(startTime);
  const startEvent = format(new Date(startTime), "hh:mm aa");
  const endEvent = format(new Date(endTime), "hh:mm aa");

  const commonColor = {
    color: !secondary ? colors.secondary : "white",
  };

  const commonSecondaryColor = secondary ? colors.tertiary : colors.secondary;

  const shadow = !secondary && {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.35,
    marginBottom: 20,
    elevation: 6,
  };

  return (
    <>
      <Pressable
        onPress={onPress}
        style={[
          styles.senderContainer,
          {
            justifyContent: sender ? "flex-end" : "flex-start",
          },
          style,
        ]}
      >
        {secondary && !noIcon && <Image style={styles.textImage} source={require("../../assets/icons/filler.png")} />}
        <View
          style={{
            maxWidth: "100%",
            marginRight: secondary && sender && 20,
          }}
        >
          <View
            style={[
              styles.senderContent,
              {
                backgroundColor: secondary ? colors.secondary : "#EBEBEB",
                marginLeft: secondary && !noIcon ? 20 : 0,
                paddingHorizontal: secondary ? 20 : 23,
                height: secondary ? 150 : 130,
                paddingVertical: !secondary ? 10 : 0,
                ...shadow,
              },
            ]}
          >
            <View style={styles.timeContainer}>
              <View style={styles.dateContainer}>
                <FlipText
                  style={[commonColor, { fontSize: secondary ? normalize(35) : normalize(30), marginTop: 5 }]}
                  type="Regular"
                >
                  {format(dateEvent, "dd")}
                </FlipText>
                <FlipText style={commonColor} type="Regular">
                  {nth(dateEvent.toLocaleDateString("en-US", { day: "numeric" }))}
                </FlipText>
                <FlipText
                  style={[commonColor, { fontSize: secondary ? normalize(20) : normalize(15), marginTop: 20 }]}
                  type="Bold"
                >
                  {format(dateEvent, "MMMM")}
                </FlipText>
              </View>
              <FontAwesome5 style={styles.shareIcon} name="share-square" size={15} color={commonSecondaryColor} />
            </View>
            <View>
              <View>
                <FlipText
                  style={[commonColor, { fontSize: secondary ? normalize(16) : normalize(13), marginBottom: 5 }]}
                  type="Regular"
                >
                  {title}
                </FlipText>
                {!secondary && (
                  <FontAwesome5 style={styles.shareIcon} name="bell-slash" size={15} color={commonSecondaryColor} />
                )}
              </View>
              <View style={styles.timeContainer}>
                <FontAwesome5
                  name="clock"
                  size={secondary ? normalize(16) : normalize(12)}
                  color={commonSecondaryColor}
                />
                <FlipText
                  style={{
                    color: commonSecondaryColor,
                    fontSize: secondary ? normalize(16) : normalize(12),
                    marginLeft: 5,
                  }}
                  type="Regular"
                >
                  {startEvent + " - " + endEvent}
                </FlipText>
              </View>
              {connections.length > 2 ||
                ((!secondary || noIcon) && (
                  <View style={styles.otherConnections}>
                    <Image style={styles.image} source={require("../../assets/icons/filler.png")} />
                    <FlipText
                      style={{
                        color: commonSecondaryColor,
                        fontSize: secondary ? normalize(12) : normalize(9),
                        marginLeft: 5,
                      }}
                      type="Regular"
                    >
                      with {connections.length} other connection{connections.length > 1 ? "s" : null}
                    </FlipText>
                  </View>
                ))}
            </View>
          </View>
          {status === "pending" && !sender && (
            <View style={styles.pendingContainer}>
              <FlipButton
                style={[styles.button, { backgroundColor: colors.foreground }]}
                type="Submit"
                buttonText="ACCEPT"
                fontSize={normalize(14)}
                onPress={onAccept}
              />
              <FlipButton
                style={[styles.button, { backgroundColor: "white", borderColor: colors.foreground, borderWidth: 1 }]}
                color={colors.foreground}
                type="Interactive"
                buttonText="DECLINE"
                fontSize={normalize(14)}
                onPress={onDecline}
              />
            </View>
          )}
        </View>
      </Pressable>
      {status !== "pending" ||
        (!secondary && (
          <FlipText style={[styles.responseMessage, { color: colors.secondary }]} type="Regular">
            {`${!sender ? "You" : connections[0].firstName} ${status} the event invite`}
          </FlipText>
        ))}
    </>
  );
}

export default FlipEventBadge;

const styles = StyleSheet.create({
  senderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  textImage: { width: 32, height: 32, borderRadius: 32 / 2, position: "absolute", zIndex: 1, elevation: 3 },
  image: { width: 18, height: 18, borderRadius: 18 / 2 },
  senderContent: {
    borderRadius: 20,
    justifyContent: "space-evenly",
  },
  dateContainer: {
    flexDirection: "row",
    marginRight: 15,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherConnections: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  pendingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
  },
  button: {
    height: 40,
    width: "48%",
  },
  responseMessage: { fontSize: normalize(14), textAlign: "center", width: "100%", margin: 10 },
  shareIcon: { position: "absolute", right: 0, top: 0 },
});
