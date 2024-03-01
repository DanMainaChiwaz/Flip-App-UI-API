import React, { useContext, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, View, Image, StyleSheet } from "react-native";
import { FlipText } from "components";
import { ThemeContext } from "utils/theme-context";
import { normalize, nth } from "utils/helpers";
import { format } from "date-fns";
import { IEvent } from "reducers/home";

interface EventBadgeProps {
  onPress: () => any;
  item: IEvent;
  onPlan: (value: string) => any;
}

function EventBadge(props: EventBadgeProps) {
  const { colors } = useContext(ThemeContext);

  const { onPress, item, onPlan } = props;

  const { title, startTime, endTime, connections, status } = item;

  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const dateEvent = new Date(startTime);
  const startEvent = format(new Date(startTime), "hh:mm aa");
  const endEvent = format(new Date(endTime), "hh:mm aa");

  return (
    <Pressable onPress={onPress} style={styles.event}>
      <View style={styles.subContainer}>
        <FlipText style={{ fontSize: 20 }} type="Bold">
          {format(dateEvent, "dd")}
        </FlipText>
        <FlipText style={{ height: "70%", fontSize: 12 }} type="Regular">
          {nth(dateEvent.toLocaleDateString("en-US", { day: "numeric" }))}
        </FlipText>
        <FlipText style={{ marginRight: 10 }} type="Bold">
          {format(dateEvent, "MMMM")} from {startEvent} - {endEvent}
        </FlipText>
        <FontAwesome5 name="bell-slash" size={15} />
        <FontAwesome5 style={{ position: "absolute", right: 10 }} name="share-square" size={15} />
      </View>
      <FlipText type="Bold">{title}</FlipText>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.imageEvent} source={require("assets/icons/filler.png")} />
        {connections.length > 1 && (
          <Image
            style={[styles.imageEvent, { position: "absolute", left: 8, bottom: 4 }]}
            source={require("assets/icons/filler.png")}
          />
        )}
        <FlipText style={{ marginLeft: connections.length > 1 ? 15 : 5, fontSize: 12 }} type="Regular">
          with {connections.length} other connection{connections.length > 1 ? "s" : null}
        </FlipText>
      </View>
      <View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.foreground,
            width: "25%",
            borderRadius: 10,
            justifyContent: "space-evenly",
            padding: 2,
          }}
          onPress={() => setOpenPicker(!openPicker)}
        >
          <FlipText style={{ color: colors.background, fontSize: 12 }} type="Regular">
            {status === "accepted" ? "Going" : status === "pending" ? "Maybe" : "Not Going"}
          </FlipText>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 15,
              width: 12,
              height: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name={openPicker ? "chevron-up" : "chevron-down"} size={6} color={colors.secondary} />
          </View>
        </Pressable>
        {openPicker && (
          <View style={[styles.picker, { backgroundColor: colors.secondary }]}>
            <View
              style={[
                styles.subPicker,
                { backgroundColor: colors.tertiary, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              ]}
            >
              <FlipText style={[styles.pickerText, { color: colors.secondary }]} type="Regular">
                Your response
              </FlipText>
            </View>
            <Pressable onPress={() => onPlan("declined")} style={styles.subPicker}>
              <FlipText
                style={[styles.pickerText, { color: status === "declined" ? colors.foreground : colors.background }]}
                type="Regular"
              >
                Not Going
              </FlipText>
            </Pressable>
            <Pressable onPress={() => onPlan("pending")} style={styles.subPicker}>
              <FlipText
                style={[styles.pickerText, { color: status === "pending" ? colors.foreground : colors.background }]}
                type="Regular"
              >
                Maybe
              </FlipText>
            </Pressable>
            <Pressable
              onPress={() => onPlan("accepted")}
              style={[styles.subPicker, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}
            >
              <FlipText
                style={[styles.pickerText, { color: status === "accepted" ? colors.foreground : colors.background }]}
                type="Regular"
              >
                Going
              </FlipText>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default EventBadge;

const styles = StyleSheet.create({
  event: {
    width: "90%",
    height: 118,
    borderRadius: 10,
    backgroundColor: "#EBEBEB",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.35,
    marginBottom: 20,
    elevation: 6,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  imageEvent: {
    width: 15,
    height: 15,
    borderRadius: 30,
  },
  picker: {
    position: "absolute",
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
    marginTop: 22,
  },
  subPicker: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  pickerText: {
    fontSize: normalize(13),
  },
  subContainer: { flexDirection: "row", height: "30%", alignItems: "flex-end" },
});
