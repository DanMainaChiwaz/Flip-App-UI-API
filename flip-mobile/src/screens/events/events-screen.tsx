import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { FlipText, FlipEventModal, FlipEventBadge } from "components";
import { RootState } from "store";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";
import EventBadge from "./event-badge";

function EventsScreen() {
  const { colors } = useContext(ThemeContext);

  const { upcomingEvents, pastEvents, myEvents } = useSelector((store: RootState) => store.event);

  const [viewType, setViewType] = useState<string>("All");
  const [eventModal, setEventModal] = useState<{ open?: boolean; info?: any }>({ open: false, info: null });

  const Button = ({ title }) => (
    <TouchableOpacity
      style={[
        styles.selectionBtn,
        {
          borderColor: colors.secondary,
          backgroundColor: viewType === title ? colors.secondary : colors.background,
        },
      ]}
      onPress={() => setViewType(title)}
    >
      <FlipText
        style={[styles.selectionTxt, { color: viewType === title ? colors.background : colors.secondary }]}
        type="Regular"
      >
        {title}
      </FlipText>
    </TouchableOpacity>
  );

  const Event = ({ item }) => (
    <EventBadge
      item={item}
      onPlan={(value) => updatePlanEvent(value)}
      onPress={() => setEventModal({ open: true, info: item })}
    />
  );

  const updatePlanEvent = (value) => {
    // TODO: update status event
  };

  return (
    <View style={styles.container}>
      <FlipEventModal
        currentUserId="1"
        data={eventModal.info}
        visible={eventModal.open}
        onClose={() => setEventModal({ open: false, info: null })}
      />
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={[styles.selectionContainer, { borderColor: colors.tertiary }]}>
              <Button title="All" />
              <Button title="Past" />
              <Button title="Hosting" />
            </View>
            <FlipText style={[styles.title, { color: colors.secondary, marginBottom: 10 }]} type="Bold">
              {viewType === "All" ? "Upcoming Events" : viewType === "Past" ? "Past Events" : "Hosting Events"}
            </FlipText>
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventsList}
        data={viewType === "All" ? upcomingEvents : viewType === "Past" ? pastEvents : myEvents}
        CellRendererComponent={({ children, index, style, ...props }) => {
          const cellStyle = [
            style,
            {
              zIndex:
                viewType === "All"
                  ? upcomingEvents.length - index
                  : viewType === "Past"
                  ? pastEvents.length - index
                  : myEvents.length - index,
            },
          ];
          return (
            <View style={cellStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
        removeClippedSubviews={false}
        renderItem={({ item }) => <Event key={item.id} item={item} />}
        ListFooterComponent={() =>
          viewType === "All" && (
            <>
              <FlipText style={[styles.title, { color: colors.secondary }]} type="Bold">
                Past Events
              </FlipText>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={pastEvents}
                contentContainerStyle={styles.pastEventsList}
                renderItem={({ item }) => (
                  <FlipEventBadge
                    style={styles.badge}
                    secondary
                    noIcon
                    key={item.id}
                    item={item}
                    onPress={() => setEventModal({ open: true, info: item })}
                  />
                )}
              />
            </>
          )
        }
      />
    </View>
  );
}

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  selectionBtn: {
    width: 110,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 25,
  },
  selectionTxt: {
    fontSize: normalize(13),
  },
  title: {
    fontSize: normalize(20),
    width: "90%",
    marginTop: 10,
    marginLeft: 20,
  },
  pastEventsList: { marginTop: 10, paddingRight: 20, marginLeft: 20 },
  eventsList: { marginTop: 10, paddingBottom: 20 },
  badge: { height: 150, marginRight: 10 },
});
