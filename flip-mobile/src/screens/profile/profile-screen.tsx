import { useContext, useState } from "react";
import { Dimensions, Image, StyleSheet, View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/FontAwesome";
import { RootState } from "store";
import { ThemeContext } from "utils/theme-context";
import Images from "assets";
import { FontAwesome5 } from "@expo/vector-icons";
import { IConnection } from "reducers/connection";
import { normalize } from "utils/helpers";
import { FlipModal, FlipActivityBadge, FlipConnectionBadge, FlipButton, FlipText } from "components";

interface IModal {
  connection: IConnection | null;
  visible?: boolean;
}

const ProfileScreen = ({ navigation: { navigate } }) => {
  const { colors } = useContext(ThemeContext);
  const { firstName, lastName, locationName, bannerId, bio, activities } = useSelector(
    (store: RootState) => store.user,
  );
  const { connections } = useSelector((store: RootState) => store.connection);

  const [type, setType] = useState<string>("My Activities");
  const [deleteModal, setDeleteModal] = useState<IModal>({ visible: false, connection: null });

  const { width } = Dimensions.get("screen");

  const buildCards = () =>
    activities?.map((a) => (
      <FlipActivityBadge key={a.name} name={a.name} skillLevel={a.skillLevel} playStyle={a.playStyle} />
    ));

  const buildProfile = (profile: IConnection) => {
    return (
      <FlipConnectionBadge
        key={profile.userId}
        firstName={profile.firstName}
        lastName={profile.lastName}
        lastActivity={profile.lastActivity}
        friend={profile.friend}
        onDelete={() => setDeleteModal({ visible: true, connection: profile })}
        onPress={() =>
          navigate("FriendProfile", {
            user: profile,
          })
        }
      />
    );
  };

  const deleteConnection = () => {
    //TODO: delete connection => deleteModal.connection
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <FlipModal
        visible={deleteModal.visible}
        title="Delete friend"
        message="Are you sure you want to remove this friend and their information?"
      >
        <FlipButton
          onPress={deleteConnection}
          style={[styles.buttonModal, { marginRight: 10 }]}
          type="Submit"
          buttonText="Delete"
        />
        <FlipButton
          onPress={() => setDeleteModal({ visible: false, connection: null })}
          style={[styles.buttonModal, { marginLeft: 10 }]}
          type="Interactive"
          buttonText="Cancel"
        />
      </FlipModal>
      <View style={styles.bannerContainer}>
        <Image style={[styles.bannerImage, { width: width, height: width / 3 }]} source={Images.banners[6]} />
      </View>
      <View style={styles.header}>
        <Image
          style={[styles.profileImage, { borderColor: colors.accent }]}
          source={require("assets/icons/filler.png")}
        />
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => navigate("Settings")}>
            <FontAwesome5 color={colors.secondary} size={22} name="cog" />
          </TouchableOpacity>
          <FlipButton
            buttonText="Edit Profile"
            style={[styles.editBtn, { borderColor: colors.secondary, marginLeft: 10, zIndex: 3 }]}
            color={colors.secondary}
            onPress={() => navigate("Edit Profile")}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <FlipText style={[styles.name, { color: colors.secondary }]} type="Extrabold">
          {firstName} {lastName}
        </FlipText>
        <View style={[styles.locationContainer]}>
          <Icon name="map-marker" size={15} color={colors.secondary} />
          <FlipText style={[styles.locationName, { color: colors.secondary }]} type="Regular">
            {locationName}
          </FlipText>
        </View>
        <FlipText style={[styles.bio, { color: colors.secondary }]} type="Bold">
          {bio}
        </FlipText>
      </View>
      <View style={styles.toggleContainer}>
        <Pressable
          onPress={() => setType("My Activities")}
          style={[
            styles.toggleButton,
            {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: type === "My Activities" ? colors.secondary : "transparent",
              borderColor: colors.secondary,
              borderRightWidth: 0,
            },
          ]}
        >
          <FlipText
            style={[styles.title, { color: type === "My Activities" ? "#EAF0F2" : colors.secondary }]}
            type="Extrabold"
          >
            My Activities
          </FlipText>
        </Pressable>
        <Pressable
          onPress={() => setType("My Connections")}
          style={[
            styles.toggleButton,
            {
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: type === "My Connections" ? colors.secondary : "transparent",
              borderColor: colors.secondary,
              borderLeftWidth: 0,
            },
          ]}
        >
          <FlipText
            style={[styles.title, { color: type === "My Connections" ? "#EAF0F2" : colors.secondary }]}
            type="Extrabold"
          >
            My Connections
          </FlipText>
        </Pressable>
      </View>
      {type === "My Activities" ? (
        <View style={styles.cardsContainer}>{buildCards()}</View>
      ) : (
        <View style={styles.cardsContainer}>{connections.map((connection) => buildProfile(connection))}</View>
      )}
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
    zIndex: 1,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    zIndex: 2,
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 3,
  },
  requestButton: {
    flex: 2,
  },
  messageButton: {
    flex: 2,
  },
  moreButton: {
    flex: 1,
  },
  title: {
    fontSize: normalize(15),
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
  },
  toggleButton: {
    borderWidth: 1,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  buttonModal: { width: 90, height: 45 },
});

export default ProfileScreen;
