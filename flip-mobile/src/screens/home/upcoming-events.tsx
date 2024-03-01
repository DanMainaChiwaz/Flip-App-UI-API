import { View, StyleSheet, Image } from "react-native";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/FontAwesome";
import { format } from "date-fns";
import { ThemeContext } from "utils/theme-context";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IEvent } from "reducers/home";
import { getDateSuffix } from "utils/helpers";
import { FlipText } from "components";

const UpcomingEvents = ({ containerStyles = {} }) => {
  const { colors } = useContext(ThemeContext);
  const { upcomingEvents } = useSelector((store: RootState) => store.home);

  const buildEvent = (event: IEvent) => {
    const { id, title, startTime, endTime, connections } = event;

    const date = new Date(startTime);
    const day = format(date, "dd");
    const month = format(date, "MMM");
    const suffix = getDateSuffix(date);

    return (
      <LinearGradient style={styles.event} key={id} colors={[colors.primary, colors.background]}>
        <View style={styles.dateContainer}>
          <FlipText type="Regular" style={[styles.date, { color: colors.secondary }]}>
            {day}
          </FlipText>
          <View style={styles.suffixContainer}>
            <FlipText type="Regular" style={[styles.suffix, { color: colors.secondary }]}>
              {suffix}
            </FlipText>
            <FlipText type="Regular" style={[styles.month, { color: colors.secondary }]}>
              {month}
            </FlipText>
          </View>
        </View>
        <FlipText type="Regular">
          {title} <Icon name="bell" size={12} color={colors.interactive} />
        </FlipText>
        <View style={styles.connections}>
          <Image source={require("assets/icons/filler.png")} style={styles.connectionsIcon} />
          <FlipText type="Regular" style={[styles.connectionsText, { color: colors.secondary }]}>
            with {connections.length} other connections
          </FlipText>
        </View>
        <View style={styles.timesContainer}>
          <Icon style={styles.clockIcon} name="clock-o" size={25} color={colors.secondary} />
          <FlipText type="Regular">
            {startTime} - {endTime}
          </FlipText>
        </View>
        <Icon style={styles.icon} name="external-link" size={15} color={colors.interactive} />
      </LinearGradient>
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.titleContainer}>
        <FlipText type="Regular" style={[styles.title, { color: colors.interactive }]}>
          Upcoming Events
        </FlipText>
        <Icon style={styles.calendarIcon} name="calendar" size={20} color={colors.secondary} />
      </View>
      <View style={styles.eventContainer}>{upcomingEvents.map((event) => buildEvent(event))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  titleContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    paddingLeft: 10,
    fontSize: 22,
  },
  calendarIcon: {
    marginRight: 10,
  },
  eventContainer: {
    flexDirection: "row",
  },
  event: {
    flex: 1,
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  dateContainer: {
    flexDirection: "row",
  },
  date: {
    fontSize: 30,
  },
  suffixContainer: {
    marginLeft: 5,
  },
  suffix: {
    fontSize: 16,
  },
  month: {},
  connections: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  connectionsIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  connectionsText: {
    fontSize: 10,
  },
  timesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIcon: {
    marginRight: 5,
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default UpcomingEvents;
