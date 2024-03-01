import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { FlipButton, FlipContainer, FlipText, FlipTextInput } from "components";
import { RootState } from "store";
import { IConnection } from "reducers/connection";
import { ThemeContext } from "utils/theme-context";

function BlockedConnectionsSetting() {
  const { colors } = useContext(ThemeContext);

  const { blockedConnections } = useSelector((store: RootState) => store.connection);
  const [filteredData, setFilteredData] = useState<IConnection[]>([]);
  const [search, setSearch] = useState<string>("");

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = blockedConnections.filter(function (item) {
        const itemData = item.firstName ? item.firstName.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(blockedConnections);
      setSearch(text);
    }
  };

  const unblockUser = () => {
    // TODO: unblock user
  };

  return (
    <FlipContainer style={styles.container}>
      <View style={styles.searchInputContainer}>
        <FlipTextInput
          iconName="search"
          style={styles.searchInput}
          iconStyle={{ top: 12 }}
          placeholder="Search"
          onChangeText={(value) => searchFilterFunction(value)}
        />
      </View>
      <FlatList
        data={search.length > 1 ? filteredData : blockedConnections}
        ListFooterComponent={() => <View style={[styles.separator, { backgroundColor: colors.tertiary }]} />}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.tertiary }]} />}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.userId}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.image} source={require("assets/icons/filler.png")} />
              <FlipText style={{ color: colors.secondary }} type="Bold">
                {item.firstName + " " + item.lastName}
              </FlipText>
            </View>
            <FlipButton style={styles.button} buttonText="UNBLOCK" type="Interactive" onPress={unblockUser} />
          </View>
        )}
        keyExtractor={(item) => item.userId}
      />
    </FlipContainer>
  );
}

export default BlockedConnectionsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  searchInput: { backgroundColor: "transparent", height: 45, paddingLeft: 10 },
  longBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 15,
    borderBottomWidth: 1,
    height: 60,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 90,
    marginRight: 10,
  },
  separator: {
    height: 1,
    width: "100%",
  },
  button: {
    height: 40,
  },
});
