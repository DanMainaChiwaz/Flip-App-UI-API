import { useContext } from "react";
import { Dimensions, Image, StyleSheet, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/FontAwesome";
import { RootState } from "store";
import { ThemeContext } from "utils/theme-context";
import Images from "assets";
import { FlipActivityBadge, FlipText, FlipButton } from "components";
import { normalize } from "utils/helpers";

const FriendProfileScreen = ({ route }) => {
  const { colors } = useContext(ThemeContext);
  const { bannerId } = useSelector((store: RootState) => store.user);

  const { user } = route.params;

  const { width } = Dimensions.get("screen");

  const buildCards = () =>
    user?.activities?.map((a) => (
      <FlipActivityBadge key={a.name} name={a.name} skillLevel={a.skillLevel} playStyle={a.playStyle} />
    ));

  const sendRequest = () => {
    //TODO: send request to connection
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image style={[styles.bannerImage, { width: width, height: width / 3 }]} source={Images.banners[7]} />
        <View style={styles.header}>
          <Image
            style={[styles.profileImage, { borderColor: colors.accent }]}
            source={require("assets/icons/filler.png")}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <FlipText style={[styles.name, { color: colors.secondary }]} type="Extrabold">
          {user.firstName} {user.lastName}
        </FlipText>
        <View style={[styles.locationContainer]}>
          <Icon name="map-marker" size={15} color={colors.secondary} />
          <FlipText style={[styles.locationName, { color: colors.secondary }]} type="Regular">
            {user.location}
          </FlipText>
        </View>
        <FlipText style={[styles.bio, { color: colors.secondary }]} type="Bold">
          {user.bio}
        </FlipText>
      </View>
      <View style={styles.interactContainer}>
        <FlipButton
          onPress={sendRequest}
          buttonText={user.friend ? "Remove Connection" : "Send Request"}
          type="Interactive"
          color={!user.friend ? "white" : colors.secondary}
          style={[
            styles.editBtn,
            {
              width: "38%",
              backgroundColor: user.friend ? "transparent" : colors.secondary,
              borderColor: colors.secondary,
            },
          ]}
        />
        <FlipButton
          //onPress={() => navigate("Messages")}
          buttonText="Message"
          type="Interactive"
          style={[styles.editBtn, { width: "38%", borderColor: colors.secondary }]}
        />
        <FlipButton
          buttonText="More"
          type="Interactive"
          style={[styles.editBtn, { width: "20%", borderColor: colors.secondary }]}
        />
      </View>
      <FlipText style={[styles.title, { color: colors.secondary }]} type="Extrabold">
        {user.firstName}'s Sports
      </FlipText>
      <View style={styles.cardsContainer}>{buildCards()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    top: 90,
  },
  bannerImage: {},
  profileImage: {
    marginLeft: 10,
    borderRadius: 90,
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  name: {
    marginTop: 60,
    fontSize: normalize(20),
    textTransform: "uppercase",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: normalize(12),
  },
  bio: {
    marginTop: 5,
    fontSize: normalize(15),
  },
  title: {
    fontSize: normalize(18),
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  editBtn: {
    width: 100,
    height: 25,
    padding: 0,
    borderWidth: 1,
  },
  interactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default FriendProfileScreen;
