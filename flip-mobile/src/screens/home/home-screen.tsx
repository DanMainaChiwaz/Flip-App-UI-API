import { useContext } from "react";
import { Image, StyleSheet, SafeAreaView, View, ScrollView, Platform, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/FontAwesome";
import { RootState } from "store";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";
import { IEvent } from "reducers/home";
import { IConnection } from "reducers/connection";
import { FlipEventBadge, FlipConnectionBadge, FlipText, FlipButton } from "components";

const HomeScreen = ({ navigation: { navigate } }) => {
  const { colors } = useContext(ThemeContext);
  const { firstName } = useSelector((store: RootState) => store.auth.user);
  const { suggestedConnections } = useSelector((store: RootState) => store.home);
  const { upcomingEvents } = useSelector((store: RootState) => store.home);

  const deleteConnection = () => {
    //TODO: delete connection
  };

  const buildProfile = (profile: IConnection) => {
    const { userId, firstName, lastName, mutualCount, friend } = profile;

    return (
      <FlipConnectionBadge
        key={userId}
        firstName={firstName}
        lastName={lastName}
        mutualCount={mutualCount}
        onDelete={deleteConnection}
        friend={friend}
        onPress={() =>
          navigate("FriendProfile", {
            user: profile,
          })
        }
      />
    );
  };

  const buildEvent = (event: IEvent) => {
    return <FlipEventBadge key={event.id} item={event} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon style={styles.menuIcon} color={colors.secondary} name="plus-circle" size={20} />
          <Icon style={styles.menuIcon} color={colors.secondary} name="bell" size={20} />
          <TouchableOpacity onPress={() => navigate("Settings")}>
            <Icon color={colors.secondary} name="gear" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <FlipText type="Bold" style={[styles.title, { color: colors.foreground }]}>
            Good Morning <FlipText type="Extrabold">{firstName},</FlipText>
          </FlipText>
        </View>
        <View style={styles.promptContainer}>
          <Image style={styles.promptImage} source={require("assets/icons/filler.png")} />
          <View style={styles.promptTextContainer}>
            <FlipText type="Regular" style={[styles.promptText, { color: colors.secondary }]}>
              What activities would you like to participate in today?
            </FlipText>
            <FlipButton style={styles.promptButton} buttonText="GET STARTED" type="Submit" color="white" />
          </View>
        </View>
        <View style={[styles.titleContainer, { paddingHorizontal: 5, alignItems: "center" }]}>
          <FlipText type="Extrabold" style={[styles.title, { color: colors.foreground, marginTop: 0 }]}>
            Suggested Connections
          </FlipText>
          <Icon name="refresh" size={20} color={colors.secondary} />
        </View>
        <View style={styles.profileContainer}>
          {suggestedConnections.map((connection) => buildProfile(connection))}
        </View>
        <View style={[styles.titleContainer, { paddingHorizontal: 5, alignItems: "center", marginTop: 10 }]}>
          <FlipText type="Extrabold" style={[styles.title, { color: colors.foreground, marginTop: 0 }]}>
            Upcoming Events
          </FlipText>
          <TouchableOpacity onPress={() => navigate("Events")}>
            <Icon name="calendar" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.eventContainer}>{upcomingEvents.map((event) => buildEvent(event))}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: normalize(26),
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  menuIcon: {
    marginRight: 10,
  },
  promptContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  promptImage: {
    maxHeight: 100,
    maxWidth: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  promptTextContainer: {
    flex: 1,
  },
  promptText: {
    marginBottom: 10,
  },
  promptButton: { width: 120, height: 40 },
  suggestedContainer: {},
  eventsContainer: {},
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
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
    width: 100,
    height: 125,
  },
  profileSummary: {
    padding: 5,
  },
  profileName: { textAlign: "center", fontSize: 14 },
  profileMutual: { textAlign: "center", fontSize: 10 },
});
