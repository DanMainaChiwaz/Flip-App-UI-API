import { useContext, useState } from "react";
import { TouchableOpacity, Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/FontAwesome";
import { FlipText } from "components";
import { RootState } from "store";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";

const SuggestedConnectionsScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { suggestedConnections } = useSelector((store: RootState) => store.connection);

  const [viewType, setViewType] = useState<boolean>(false);

  const buildIcon = (activityName, isActive) => (
    <View
      key={Math.random()}
      style={[cardStyles.infoIcon, { borderColor: isActive ? colors.accent : colors.inactive }]}
    >
      {/* Add custom icons ==> <Icon name={activityName} size={25} /> */}
      <Image style={[cardStyles.photo, { borderRadius: 90 }]} source={require("../../../assets/icons/filler.png")} />
    </View>
  );

  const buildCards = () =>
    suggestedConnections.map((connection) => (
      <View key={connection.userId} style={[cardStyles.card, { width: viewType ? "48%" : "100%" }]}>
        <Image style={cardStyles.photo} source={require("../../../assets/icons/filler.png")} />
        <TouchableOpacity style={cardStyles.deleteBtn}>
          <Icon name="times-circle" size={normalize(18)} color={colors.secondary} />
        </TouchableOpacity>
        {viewType ? (
          <View
            style={[
              cardStyles.infoContainerType2,
              {
                backgroundColor: colors.secondary,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <View style={[cardStyles.titleContainer, { marginRight: 10 }]}>
                <FlipText type="Bold" style={[cardStyles.name, { color: colors.background }]}>
                  {connection.firstName} {connection.lastName}
                </FlipText>
                <FlipText type="Regular" style={[cardStyles.mutual, { color: colors.background }]}>
                  {connection.activities.length} Mutual Sports
                </FlipText>
              </View>
              <Icon name="user-plus" size={normalize(16)} color={colors.background} />
            </View>
            <ScrollView horizontal={true}>
              {connection.activities.map((activity) => buildIcon(activity, true))}
            </ScrollView>
          </View>
        ) : (
          <View style={[cardStyles.infoContainerType1, { backgroundColor: colors.secondary }]}>
            <View style={cardStyles.titleContainer}>
              <FlipText type="Bold" style={[cardStyles.name, { color: colors.background }]}>
                {connection.firstName} {connection.lastName}
              </FlipText>
              <FlipText type="Regular" style={[cardStyles.mutual, { color: colors.background }]}>
                {connection.activities.length} Mutual Sports
              </FlipText>
            </View>
            <View style={[cardStyles.break, { backgroundColor: colors.background }]} />
            <ScrollView horizontal={true}>
              {connection.activities.map((activity) => buildIcon(activity, true))}
            </ScrollView>
            <View style={[cardStyles.break, { backgroundColor: colors.background }]} />
            <Icon name="user-plus" size={normalize(16)} color={colors.background} />
          </View>
        )}
      </View>
    ));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <FlipText type="Extrabold" style={[styles.title, { color: colors.foreground, marginTop: 0 }]}>
          Filtered Connections
        </FlipText>
        <View style={styles.iconContainer}>
          <Icon name="refresh" size={normalize(20)} color={colors.secondary} style={{ marginRight: 10 }} />
          <TouchableOpacity onPress={() => setViewType(!viewType)}>
            <Icon name="th-list" size={normalize(20)} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.cardsContainer,
          viewType && {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          },
        ]}
      >
        {buildCards()}
      </ScrollView>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
    height: 220,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  infoContainerType1: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainerType2: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "column",
    paddingTop: 5,
    paddingBottom: 10,
  },
  titleContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 12,
  },
  mutual: {
    fontSize: 10,
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 90,
    marginLeft: 5,
  },
  break: {
    width: 2,
    borderRadius: 3,
    marginHorizontal: 10,
    marginVertical: -3,
    alignSelf: "stretch",
  },
  deleteBtn: {
    position: "absolute",
    top: 20,
    right: 15,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  nav: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  navLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  navRight: {
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    marginTop: 15,
    fontSize: normalize(22),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

export default SuggestedConnectionsScreen;
