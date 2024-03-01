import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { ThemeContext } from "utils/theme-context";
import { FontAwesome5 } from "@expo/vector-icons";
import FlipText from "./flip-text";
import FlipTextInput from "./flip-text-input";
import FlipSearchConnections from "./flip-search-connections";
import FlipButton from "./flip-button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import FlipModal from "./flip-modal";
import { IEvent } from "reducers/home";
import { IConnection } from "reducers/connection";
import { normalize } from "utils/helpers";

interface FlipEventModalProps {
  visible: boolean;
  style?: any;
  onClose?(): void;
  onSendEvent?: any;
  data?: IEvent;
  members?: IConnection[];
  currentUserId: string;
}

function FlipEventModal(props: FlipEventModalProps) {
  const { colors } = useContext(ThemeContext);

  const { members = [], visible, onClose, onSendEvent, data, currentUserId } = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState<{ visible?: boolean; type?: string }>({
    visible: false,
    type: "",
  });
  const [modalConnection, setModalConnection] = useState<boolean>(false);
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const [hosted, setHosted] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | string>("");
  const [endDate, setEndDate] = useState<Date | string>("");
  const [description, setDescription] = useState<string>("");
  const [people, setPeople] = useState<IConnection[]>([]);

  useEffect(() => {
    if (data) {
      if (currentUserId !== data.eventLeader.userId) {
        setHosted(false);
      }
      setPeople(data.connections);
      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setStartDate(data.startTime);
      setEndDate(data.endTime);
    } else {
      setHosted(true);
      setPeople(members);
      setTitle("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
    }
  }, [data]);

  const MapPeople = () => {
    let count = 0;

    let right = [];
    let left = [];

    for (let i = 0; i < people.length; i++) {
      count++;
      if (count % 2 === 0) {
        right.push(people[i]);
      } else {
        left.push(people[i]);
      }
    }

    return (
      <View style={styles.peopleContainer}>
        <View style={styles.peopleSubContainer}>
          {left.map((e) => (
            <View key={e.userId} style={styles.peopleBadge}>
              <FlipText type="Regular">{e.firstName + " " + e.lastName}</FlipText>
            </View>
          ))}
        </View>
        <View style={styles.peopleSubContainer}>
          {right.map((e) => (
            <View key={e.userId} style={styles.peopleBadge}>
              <FlipText type="Regular">{e.firstName + " " + e.lastName}</FlipText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <FlipModal title="Are you sure?" message="This event won't be saved if you exit now" visible={closeModal}>
        <FlipButton
          onPress={() => {
            setCloseModal(false);
            onClose();
          }}
          style={[styles.buttonModal, { marginRight: 10 }]}
          type="Submit"
          buttonText="Delete Event"
        />
        <FlipButton
          onPress={() => setCloseModal(false)}
          style={[styles.buttonModal, { marginLeft: 10 }]}
          type="Interactive"
          buttonText="Cancel"
        />
      </FlipModal>
      <FlipSearchConnections
        selectedMembers={people}
        visible={modalConnection}
        onAdd={(value) => {
          setPeople(value);
          setModalConnection(false);
        }}
        onCancel={() => setModalConnection(false)}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image
              style={[styles.headerImage, { borderColor: colors.accent }]}
              source={require("assets/icons/filler.png")}
            />
            <Image
              style={[styles.headerImage, { borderColor: colors.accent }]}
              source={require("assets/icons/filler.png")}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ height: Platform.OS === "ios" ? 700 : "80%" }}
          >
            <ScrollView
              style={[styles.subContainer, { backgroundColor: colors.secondary, flex: 1 }]}
              contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
            >
              <View style={styles.subContainerHeader}>
                <View>
                  <FlipText style={styles.title} type="Extrabold">
                    {data && hosted ? "Editing an event" : !data && hosted ? "Creating an event" : "Event Details"}
                  </FlipText>
                  {hosted && (
                    <FlipText style={{ color: colors.background }} type="Regular">
                      Event hosted by you.
                    </FlipText>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    data ? onClose() : setCloseModal(true);
                  }}
                >
                  <FontAwesome5 name="window-close" size={30} color={colors.foreground} />
                </TouchableOpacity>
              </View>
              <View style={styles.subContainerContent}>
                <FlipText style={styles.label} type="Regular">
                  Title
                </FlipText>
                <FlipTextInput
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                  style={styles.input}
                  placeholder="Add a title"
                />
              </View>
              <View style={styles.subContainerContent}>
                <FlipText style={styles.label} type="Regular">
                  Location
                </FlipText>
                <FlipTextInput
                  value={location}
                  onChangeText={(value) => setLocation(value)}
                  style={styles.input}
                  placeholder="Add a location"
                  iconOnEnd
                  iconName="dot-circle"
                />
              </View>
              <View style={styles.subContainerContent}>
                <FlipText style={styles.label} type="Regular">
                  Start Date
                </FlipText>
                <Pressable
                  style={styles.selectorBtn}
                  onPress={() => setDatePickerVisibility({ visible: true, type: "start" })}
                >
                  <FlipText style={[styles.placeholder, { color: colors.secondary }]} type="Regular">
                    {startDate ? format(new Date(startDate), "MM/dd/yyyy, hh:mm aa") : "Add a date"}
                  </FlipText>
                  <FontAwesome5 name="calendar" size={20} color={colors.secondary} />
                </Pressable>
              </View>
              <View style={styles.subContainerContent}>
                <FlipText style={styles.label} type="Regular">
                  End Date
                </FlipText>
                <Pressable
                  style={styles.selectorBtn}
                  onPress={() => setDatePickerVisibility({ visible: true, type: "end" })}
                >
                  <FlipText style={[styles.placeholder, { color: colors.secondary }]} type="Regular">
                    {endDate ? format(new Date(endDate), "MM/dd/yyyy, hh:mm aa") : "Add a date"}
                  </FlipText>
                  <FontAwesome5 name="calendar" size={20} color={colors.secondary} />
                </Pressable>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible.visible}
                buttonTextColorIOS={colors.secondary}
                mode="datetime"
                onConfirm={(value) => {
                  isDatePickerVisible.type === "start" ? setStartDate(value) : setEndDate(value);
                  setDatePickerVisibility({ visible: false });
                }}
                onCancel={() => setDatePickerVisibility({ visible: false })}
                minimumDate={startDate ? new Date(startDate) : null}
              />
              <View style={styles.subContainerContent}>
                <FlipText style={styles.label} type="Regular">
                  Description
                </FlipText>
                <FlipTextInput
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                  style={styles.input}
                  placeholder="Add a description"
                />
              </View>
              <View style={styles.subContainerContent}>
                <FlipText style={[styles.label, { marginBottom: 10 }]} type="Regular">
                  People
                </FlipText>
                <MapPeople />
                {hosted && (
                  <View style={styles.addPeople}>
                    <TouchableOpacity onPress={() => setModalConnection(true)}>
                      <FontAwesome5 name="plus-circle" size={24} color={colors.tertiary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {hosted && (
                <View>
                  <FlipButton
                    disabled={
                      data
                        ? data.status === "accepted" || data.status === "declined"
                        : !!(!title || !location || !startDate || !endDate || people.length < 1)
                    }
                    onPress={() =>
                      onSendEvent({
                        type: "event",
                        status: "pending",
                        title,
                        location,
                        description,
                        startTime: startDate,
                        endTime: endDate,
                        connections: people,
                      })
                    }
                    style={[styles.sendBtn, { width: data ? 300 : 170 }]}
                    type="Submit"
                    buttonText={data ? "Save Changes and Send Invite" : "SEND INVITE"}
                    fontSize={normalize(16)}
                  />
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

export default FlipEventModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 230 : 170,
  },
  headerImage: {
    resize: "contain",
    width: "50%",
    height: "100%",
    borderWidth: 0.5,
  },
  subContainer: {
    marginTop: -16,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  subContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subContainerContent: {
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: normalize(25),
    color: "white",
  },
  label: {
    fontSize: normalize(15),
    color: "white",
  },
  placeholder: {
    fontSize: normalize(16),
  },
  input: {
    height: 45,
    width: "100%",
    marginTop: 5,
  },
  selectorBtn: {
    height: 45,
    width: "100%",
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  sendBtn: {
    marginTop: 30,
    height: 45,
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLabel: {
    height: "100%",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  timeStamp: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  addPeople: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  peopleBadge: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    height: 40,
    marginBottom: 10,
  },
  peopleContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  peopleSubContainer: { width: "48%" },
  buttonModal: { width: 90, height: 45 },
});
