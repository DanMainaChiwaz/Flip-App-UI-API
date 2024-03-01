import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Modal, View, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { ThemeContext } from "utils/theme-context";
import FlipContainer from "./flip-container";
import FlipText from "./flip-text";
import FlipTextInput from "./flip-text-input";
import FlipButton from "./flip-button";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { IConnection } from "reducers/connection";
import { normalize } from "utils/helpers";

interface FlipSearchConnectionProps {
  visible: boolean;
  onAdd?: (props: IConnection[]) => void;
  onCancel?(): void;
  selectedMembers?: IConnection[];
}

function FlipSearchConnection(props: FlipSearchConnectionProps) {
  const { colors } = useContext(ThemeContext);
  const { connections } = useSelector((store: RootState) => store.connection);

  const { visible, onAdd, onCancel, selectedMembers } = props;

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IConnection[]>([]);
  const [selectedConnections, setSelectedConnections] = useState<IConnection[]>([]);
  const [endReached, setEndReached] = useState<boolean>(false);

  useEffect(() => {
    setSelectedConnections([...selectedMembers]);
  }, []);

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

  const addConnection = (item) => {
    let id = item.userId;
    let arr = selectedConnections;

    if (selectedConnections.some((e) => e.userId === id)) {
      for (let i = 0; i < arr.length; i++) {
        if (id === arr[i].userId) {
          arr.splice(i, 1);
          setSelectedConnections([...arr]);
        }
      }
    } else {
      arr.push(item);
      setSelectedConnections([...arr]);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <FlipContainer style={styles.container}>
        <View style={styles.content}>
          <FlipTextInput
            iconName="search"
            style={styles.searchInput}
            iconStyle={{ top: 13 }}
            placeholder="Search your connections"
            value={search}
            onChangeText={(value) => searchFilterFunction(value)}
          />
          <View style={styles.searchContainer}>
            <FlatList
              data={search.length === 0 ? connections : filteredData}
              contentContainerStyle={{ minHeight: "100%" }}
              onEndReached={() => setEndReached(true)}
              ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.tertiary }]} />}
              renderItem={({ item }) => {
                let selected = selectedConnections.some((e) => e.userId === item.userId);
                return (
                  <Pressable onPress={() => addConnection(item)} key={item.userId} style={styles.connectionContainer}>
                    <View style={styles.connectionHeading}>
                      <Image style={styles.picture} source={require("assets/icons/filler.png")} />
                      <FlipText style={styles.connectionName} type="Regular">
                        {item.firstName + " " + item.lastName}
                      </FlipText>
                    </View>
                    <Checkbox
                      color={selected ? colors.secondary : undefined}
                      value={selected}
                      style={[styles.checkbox, { borderColor: colors.secondary }]}
                    />
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.userId}
            />
            {!endReached && (
              <View style={[styles.buttonsContainer, { justifyContent: "center", padding: 5 }]}>
                <FontAwesome5 name="angle-down" size={24} color={colors.tertiary} />
              </View>
            )}
            <View style={styles.buttonsContainer}>
              <FlipButton
                onPress={() => onAdd(selectedConnections)}
                style={styles.button}
                type="Submit"
                buttonText="ADD"
                fontSize={normalize(16)}
              />
              <FlipButton
                style={[styles.button, { backgroundColor: "white", borderColor: colors.secondary, borderWidth: 1 }]}
                color={colors.secondary}
                type="Interactive"
                buttonText="CANCEL"
                fontSize={normalize(16)}
                onPress={onCancel}
              />
            </View>
          </View>
        </View>
      </FlipContainer>
    </Modal>
  );
}

export default FlipSearchConnection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(226, 226, 226, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    height: "40%",
    justifyContent: "space-between",
  },
  searchInput: {
    borderWidth: 0,
    height: 47,
    paddingLeft: 10,
    borderRadius: 5,
  },
  searchContainer: {
    height: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 5,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  button: {
    width: "40%",
    height: 45,
  },
  connectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  connectionHeading: {
    flexDirection: "row",
    alignItems: "center",
  },
  picture: { width: 25, height: 25, borderRadius: 25 / 2 },
  checkbox: {
    borderRadius: 5,
    flexDirection: "row",
    alignSelf: "flex-start",
    height: 20,
    width: 20,
  },
  connectionName: {
    marginLeft: 10,
    fontSize: normalize(16),
  },
  separator: {
    height: 2,
    width: "90%",
    alignSelf: "flex-end",
  },
});
