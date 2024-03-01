import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
  FlipText,
  FlipContainer,
  FlipSwipeableButton,
  FlipTextInput,
  FlipModal,
  FlipButton,
  FlipBottomSelector,
  FlipBanner,
} from "components";
import { ThemeContext } from "utils/theme-context";
import { RootState } from "store";
import { normalize } from "utils/helpers";

interface IModal {
  index?: number | null;
  open?: boolean;
}

const ChatScreen = ({ navigation: { navigate } }) => {
  const { colors } = useContext(ThemeContext);

  const { chats } = useSelector((store: RootState) => store.chat);

  const [deleteModal, setDeleteModal] = useState<IModal>({
    index: null,
    open: false,
  });
  const [actionModal, setActionModal] = useState<IModal>({
    index: null,
    open: false,
  });
  const [deleteConvo, setDeleteConvo] = useState<boolean>(false);
  const [report, setReport] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = chats.filter(function (item) {
        const itemData = item.members[1].firstName ? item.members[1].firstName.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(chats);
      setSearch(text);
    }
  };

  const deleteMessage = (id) => {
    // TODO: delete message
    setDeleteModal({ open: false });
    setDeleteConvo(true);
    setTimeout(() => {
      setDeleteConvo(false);
    }, 1500);
  };

  const removeUser = () => {
    // TODO: remove user
    setActionModal({ open: false });
    setRemove(true);
    setTimeout(() => {
      setRemove(false);
    }, 1500);
  };

  const blockUser = () => {
    // TODO: block user
    setActionModal({ open: false });
    setBlocked(true);
    setTimeout(() => {
      setBlocked(false);
    }, 1500);
  };

  const reportUser = () => {
    // TODO: report user
    setActionModal({ open: false });
    setReport(true);
    setTimeout(() => {
      setReport(false);
    }, 1500);
  };

  return (
    <FlipContainer style={styles.container}>
      <FlipBanner style={styles.banner} iconName="check" message="Deleted the conversation" visible={deleteConvo} />
      <FlipBanner
        style={styles.banner}
        iconName="exclamation-triangle"
        message="Thanks for reporting the user"
        visible={report}
      />
      <FlipBanner
        style={styles.banner}
        iconName="user-slash"
        message="Removed from your connections"
        visible={remove}
      />
      <FlipBanner style={styles.banner} iconName="user-slash" message="Blocked the user" visible={blocked} />
      <FlipModal
        title="Delete Chat?"
        message="Are you sure you want to delete this conversation?"
        visible={deleteModal.open}
      >
        <FlipButton
          onPress={() => deleteMessage(deleteModal.index)}
          style={[styles.buttonModal, { marginRight: 10 }]}
          type="Submit"
          buttonText="Delete"
        />
        <FlipButton
          onPress={() => setDeleteModal({ open: false })}
          style={[styles.buttonModal, { marginLeft: 10 }]}
          type="Interactive"
          buttonText="Cancel"
        />
      </FlipModal>
      <FlipBottomSelector
        visible={actionModal.open}
        onCancel={() => setActionModal({ open: false })}
        onBackPress={() => setActionModal({ open: false })}
      >
        <FlipButton
          style={[styles.selectorBtn, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}
          type="Interactive"
          buttonText="Remove the user"
          onPress={removeUser}
          fontSize={normalize(14)}
        />
        <View style={styles.divider} />
        <FlipButton
          style={styles.selectorBtn}
          type="Interactive"
          buttonText="Block the user"
          onPress={blockUser}
          fontSize={normalize(14)}
        />
        <View style={styles.divider} />
        <FlipButton
          style={[styles.selectorBtn, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}
          type="Interactive"
          buttonText="Report the user"
          onPress={reportUser}
          fontSize={normalize(14)}
        />
      </FlipBottomSelector>
      <View style={styles.searchInputContainer}>
        <FlipTextInput
          iconName="search"
          style={styles.searchInput}
          iconStyle={{ top: 15 }}
          placeholder="Search"
          value={search}
          onChangeText={(value) => searchFilterFunction(value)}
        />
      </View>
      <FlipText
        type="Extrabold"
        style={[styles.title, { color: colors.interactive, paddingLeft: 15, fontSize: normalize(22) }]}
      >
        Recent Messages
      </FlipText>
      <FlatList
        data={search ? filteredData : chats}
        style={styles.list}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.tertiary }]} />}
        renderItem={({ item }) => {
          const lastMessage = item.messages.length - 1;
          return (
            <FlipSwipeableButton
              key={item.id}
              previewMessage={item.messages[lastMessage].content}
              userProfilePicture={item.members[1].photoUrl}
              userProfileSecondPicture={item.isGroup && item.members[2].photoUrl}
              from={item.isGroup ? item.groupName : item.members[1].firstName + " " + item.members[1].lastName}
              time={item.messages[lastMessage].dateSent}
              newMessage={item.isRead}
              onDelete={() => setDeleteModal({ index: item.id, open: true })}
              onMore={() => setActionModal({ index: item.id, open: true })}
              onPress={() =>
                navigate("Messages", {
                  chat: item,
                })
              }
            />
          );
        }}
      />
    </FlipContainer>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: normalize(26),
    marginBottom: 5,
  },
  list: {
    width: "100%",
  },
  searchInputContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  searchInput: { backgroundColor: "transparent", height: 50, paddingLeft: 10 },
  separator: {
    width: "100%",
    height: 1,
  },
  buttonModal: { width: 90, height: 45 },
  selectorBtn: {
    borderRadius: 0,
    borderWidth: 0,
  },
  divider: {
    height: 0.5,
    backgroundColor: "white",
  },
  banner: {
    width: "70%",
  },
});
