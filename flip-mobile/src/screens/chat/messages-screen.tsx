import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform } from "react-native";
import { FlipText, FlipMessageInput, FlipEventModal, FlipEventBadge } from "components";
import { ThemeContext } from "utils/theme-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { getDayStamp } from "utils/helpers";
import { format, subMinutes } from "date-fns";
import { IMessage } from "reducers/chat";
import { normalize } from "utils/helpers";

const Messages = ({ navigation: { goBack }, route }) => {
  const { colors } = useContext(ThemeContext);
  const searchInput = useRef<any>();

  const { chat } = route.params;

  const [, ...members] = chat.members;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [eventModal, setEventModal] = useState<{ open?: boolean; info?: any }>({ open: false, info: null });

  useEffect(() => {
    // TODO: retrieve all messages
    setMessages(chat.messages);
  }, []);

  const Received = (item) => {
    if (item.type === "event") {
      const name = item.connections[0].firstName + " " + item.connections[0].lastName;
      return (
        <View style={[styles.eventContainer, { borderColor: colors.tertiary }]}>
          <FlipText style={styles.eventTitle} type="Regular">
            {name + " Created an Event"}
          </FlipText>
          <View style={styles.eventSubContainer}>
            <FlipEventBadge
              secondary
              key={item.id}
              item={item}
              onPress={() => setEventModal({ open: true, info: item })}
              onAccept={acceptEvent}
              onDecline={declineEvent}
            />
          </View>
        </View>
      );
    } else if (item.type === "timestamp") {
      return (
        <FlipText style={[styles.timestamp, { color: colors.secondary }]} type="Regular">
          {getDayStamp(item.dateSent)}
        </FlipText>
      );
    } else {
      return (
        <View style={[styles.senderContainer, { marginLeft: 10 }]}>
          <Image style={styles.textImage} source={require("assets/icons/filler.png")} />
          <View style={[styles.senderContent, { backgroundColor: colors.tertiary }]}>
            <FlipText type="Regular">{item.content}</FlipText>
            <FlipText style={{ color: colors.secondary, fontSize: normalize(10) }} type="Regular">
              {format(new Date(item.dateSent), "hh:mm aa")}
            </FlipText>
          </View>
        </View>
      );
    }
  };

  const Sent = (item) => {
    if (item.type === "event") {
      return (
        <View style={[styles.eventContainer, { borderColor: colors.tertiary }]}>
          <FlipText style={styles.eventTitle} type="Regular">
            You Created an Event
          </FlipText>
          <View style={styles.eventSubContainer}>
            <FlipEventBadge
              secondary
              key={item.id}
              sender
              item={item}
              onPress={() => setEventModal({ open: true, info: item })}
            />
          </View>
        </View>
      );
    } else if (item.type === "timestamp") {
      return (
        <FlipText style={[styles.timestamp, { color: colors.secondary }]} type="Regular">
          {getDayStamp(item.dateSent)}
        </FlipText>
      );
    } else {
      return (
        <View style={[styles.senderContainer, { justifyContent: "flex-end", marginRight: 10 }]}>
          <Image style={styles.textImage} source={require("assets/icons/filler.png")} />
          <View
            style={[
              styles.senderContent,
              { backgroundColor: colors.secondary, marginLeft: 0, marginRight: 20, alignItems: "flex-end" },
            ]}
          >
            <FlipText style={{ color: "white" }} type="Regular">
              {item.content}
            </FlipText>
            <FlipText style={{ color: "white", fontSize: normalize(10) }} type="Regular">
              {format(new Date(item.dateSent), "hh:mm aa")}
            </FlipText>
          </View>
        </View>
      );
    }
  };

  const acceptEvent = () => {
    // TODO: accept event
  };

  const declineEvent = () => {
    // TODO: decline event
  };

  const sendEvent = (item) => {
    // TODO: send event to API
    item["id"] = Math.random();
    item["dateSent"] = new Date();
    item["hosted"] = true;
    item["senderId"] = chat.members[0].userId;

    const arr = [...messages];

    if (new Date().getDate() !== new Date(messages[messages.length - 1].dateSent).getDate()) {
      arr.push({
        id: Math.random(),
        type: "timestamp",
        senderId: "1",
        dateSent: subMinutes(new Date(), 60),
      });
    }

    arr.push(item);

    setMessages(arr);
  };

  const sendMessage = () => {
    // TODO: send message to API
    const arr = [...messages];

    if (new Date().getDate() !== new Date(messages[messages.length - 1].dateSent).getDate()) {
      arr.push({
        id: Math.random(),
        type: "timestamp",
        senderId: "1",
        dateSent: subMinutes(new Date(), 60),
      });
    }

    arr.push({
      content: currentMessage,
      dateSent: new Date().toISOString(),
      id: Math.random(),
      senderId: chat.members[0].userId,
    });

    setMessages(arr);
    searchInput.current.clear();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlipEventModal
        currentUserId="1"
        data={eventModal.info}
        members={members}
        onSendEvent={(value) => {
          sendEvent(value);
          setEventModal({ open: false });
        }}
        visible={eventModal.open}
        onClose={() => setEventModal({ open: false, info: null })}
      />
      <View style={[styles.header, { borderBottomColor: colors.tertiary }]}>
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <FontAwesome5 name="chevron-left" size={25} color={colors.tertiary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image style={styles.headerImage} source={require("assets/icons/filler.png")} />
            <View>
              <View>
                <FlipText style={[styles.name, { color: colors.secondary }]} type="Bold">
                  {chat.isGroup ? chat.groupName : chat.members[1].firstName + " " + chat.members[1].lastName}
                </FlipText>
                {!chat.isGroup && (
                  <FlipText style={[styles.active, { color: colors.foreground }]} type="Regular">
                    Active 3m ago
                  </FlipText>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="ellipsis-v" size={25} color={colors.tertiary} />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS !== "ios" ? 60 : 0}
      >
        <View style={styles.messagesContainer}>
          <FlatList
            contentContainerStyle={styles.chatContainer}
            inverted
            data={messages.slice().sort((a, b) => {
              return new Date(b.dateSent).valueOf() - new Date(a.dateSent).valueOf();
            })}
            renderItem={({ item }) => (item.senderId === chat.members[0].userId ? Sent(item) : Received(item))}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={[styles.inputMessageContainer, { backgroundColor: colors.secondary }]}>
          <View style={styles.subInputMessageContainer}>
            <FlipMessageInput
              ref={searchInput}
              style={{ width: "90%" }}
              placeholder="Type a message here..."
              value={currentMessage}
              onChangeText={(value) => setCurrentMessage(value)}
              onSend={sendMessage}
            />
            <TouchableOpacity onPress={() => setEventModal({ open: true, info: null })}>
              <FontAwesome5 name="plus-square" size={30} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 130 : null,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  headerImage: { width: 65, height: 65, borderRadius: 65 / 2, marginRight: 10 },
  name: {
    fontSize: normalize(20),
  },
  active: {
    fontSize: normalize(16),
  },
  messagesContainer: {
    flex: 1,
    width: "100%",
  },
  inputMessageContainer: {
    width: "100%",
    height: Platform.OS === "ios" ? 100 : 85,
    zIndex: 1,
    elevation: 3,
  },
  subInputMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  senderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
  },
  textImage: { width: 32, height: 32, borderRadius: 32 / 2, position: "absolute", zIndex: 1, elevation: 3 },
  senderContent: {
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
  },
  eventContainer: {
    borderTopWidth: 1,
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  eventSubContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  eventTitle: {
    marginBottom: 10,
  },
  chatContainer: { paddingTop: 20, paddingBottom: 20, flexGrow: 1, justifyContent: "flex-end" },
  timestamp: {
    width: "100%",
    textAlign: "center",
    padding: 5,
  },
});

export default Messages;
