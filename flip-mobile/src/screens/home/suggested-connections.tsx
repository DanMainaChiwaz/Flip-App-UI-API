import { useContext } from "react";
import { useSelector } from "react-redux";
import { Image, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "utils/theme-context";
import { RootState } from "store";
import { IProfile } from "reducers/home";
import { FlipText } from "components";

const SuggestedConnections = ({ containerStyles = {} }) => {
  const { colors } = useContext(ThemeContext);
  const { suggestedConnections } = useSelector((store: RootState) => store.home);

  const buildProfile = (profile: IProfile) => {
    return (
      <View style={styles.profile} key={profile.id}>
        <Image style={styles.profileImage} source={require("assets/icons/filler.png")} />
        <View style={[styles.profileSummary, { backgroundColor: colors.secondary }]}>
          <FlipText type="Bold" style={[styles.profileName, { color: colors.background }]}>
            {profile.firstName} {profile.lastName}
          </FlipText>
          <FlipText type="Regular" style={[styles.profileMutual, { color: colors.background }]}>
            {profile.mutualCount} Mutual Interests
          </FlipText>
        </View>
        <Icon style={styles.removeProfileIcon} name="times-circle" size={20} color={colors.secondary} />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.titleContainer}>
        <FlipText type="Regular" style={[styles.title, { color: colors.interactive }]}>
          Suggested Connections
        </FlipText>
        <Icon style={styles.refreshIcon} name="refresh" size={20} color={colors.secondary} />
      </View>
      <View style={styles.profileContainer}>{suggestedConnections.map((connection) => buildProfile(connection))}</View>
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
    marginBottom: 10,
  },
  title: {
    paddingLeft: 10,
    fontSize: 22,
  },
  refreshIcon: {
    marginRight: 10,
  },
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

export default SuggestedConnections;
