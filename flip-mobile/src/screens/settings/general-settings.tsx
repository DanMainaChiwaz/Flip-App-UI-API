import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FlipTextInput, FlipContainer, FlipLongButton } from "components";
import { signOut } from "reducers/auth";
import { SETTING_SCREENS } from "src/utils/helpers";

const GeneralSettings = ({ navigation: { navigate } }) => {
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = SETTING_SCREENS.filter(function (item) {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(SETTING_SCREENS);
      setSearch(text);
    }
  };

  return (
    <FlipContainer style={styles.container}>
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
      {search.length > 1 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.navigation}
          renderItem={({ item }) => (
            <FlipLongButton key={item.navigation} title={item.title} onPress={() => navigate(item.navigation)} />
          )}
        />
      ) : (
        <>
          <FlipLongButton title="Account" onPress={() => navigate("AccountSetting")} />
          <FlipLongButton title="Notifications" onPress={() => navigate("NotificationSetting")} />
          <FlipLongButton title="Help" onPress={() => navigate("HelpSetting")} />
          <FlipLongButton title="Log out" onPress={signOut} />
        </>
      )}
    </FlipContainer>
  );
};

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
});

export default GeneralSettings;
