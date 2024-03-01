import { useContext, useState } from "react";
import { Image, StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IConnection } from "reducers/connection";
import { ThemeContext } from "utils/theme-context";
import { FlipText, FlipTextInput } from "components";

const MyConnectionsScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { connections } = useSelector((store: RootState) => store.connection);

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IConnection[]>([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = connections.filter(function (item) {
        const itemData = item.firstName ? item.firstName.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(connections);
      setSearch(text);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchInputContainer}>
        <FlipTextInput
          iconName="search"
          style={styles.searchInput}
          iconStyle={{ top: 12 }}
          placeholder="Search"
          value={search}
          onChangeText={(value) => searchFilterFunction(value)}
        />
      </View>
      <FlatList
        data={search ? filteredData : connections}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => {
          return (
            <View style={[connectionStyles.container, { borderColor: colors.inactive }]} key={item.userId}>
              <Image source={require("../../../assets/icons/filler.png")} style={connectionStyles.image} />
              <View style={connectionStyles.infoContainer}>
                <FlipText type="Bold" style={connectionStyles.name}>
                  {item.firstName} {item.lastName}
                </FlipText>
                <FlipText type="Regular" style={connectionStyles.location}>
                  {item.location}
                </FlipText>
                <FlipText type="Regular" style={connectionStyles.mutual}>
                  10 Mutual Activities
                </FlipText>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const connectionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    minHeight: 60,
  },
  image: {
    borderRadius: 90,
    overflow: "hidden",
    width: 50,
    height: 50,
    marginRight: 15,
  },
  infoContainer: {},
  name: {
    fontSize: 12,
  },
  location: {},
  mutual: {
    fontSize: 8,
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
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
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  navRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  search: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  scroll: {
    paddingTop: 20,
  },
  searchInputContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  searchInput: { backgroundColor: "transparent", height: 45, paddingLeft: 10 },
});

export default MyConnectionsScreen;
