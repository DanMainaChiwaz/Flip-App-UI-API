import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FlipContainer, FlipLongButton, FlipTextInput } from "components";
import { SETTING_SCREENS } from "src/utils/helpers";

const AccountSetting = ({ navigation: { navigate } }) => {
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
          <FlipLongButton title="Email" onPress={() => navigate("EmailSetting")} />
          <FlipLongButton title="Phone Number" onPress={() => navigate("PhoneNumberSetting")} />
          <FlipLongButton title="Password" onPress={() => navigate("PasswordSetting")} />
          <FlipLongButton title="Close Account" onPress={() => navigate("CloseAccountSetting")} />
          <FlipLongButton title="Blocked Connections" onPress={() => navigate("BlockedConnectionsSetting")} />
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
});

export default AccountSetting;
