import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSelector } from "react-redux";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";
import { RootState } from "store";
import { FlipTextInput, FlipText, FlipButton } from "components";

function EditProfile() {
  const { colors } = useContext(ThemeContext);
  const { firstName, lastName, locationName, bio, phone } = useSelector((store: RootState) => store.user);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bioName, setBioName] = useState("");

  useEffect(() => {
    setName(firstName + " " + lastName);
    setLocation(locationName);
    setPhoneNumber(phone);
    setBioName(bio);
  }, []);

  const updateInfo = () => {
    //TODO: update user info
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ marginTop: 20 }}>
          <FlipText style={{ color: colors.secondary, marginBottom: 10, fontSize: normalize(14) }} type="Regular">
            Change Profile Photo
          </FlipText>
          <View style={styles.image}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={require("assets/icons/filler.png")}
            />
          </View>
        </View>
        <View style={{ marginBottom: 40 }}>
          <View style={styles.subContainer}>
            <FlipText style={{ color: colors.secondary, fontSize: normalize(14) }} type="Regular">
              Name
            </FlipText>
            <View style={[styles.inputContainer, { borderColor: colors.tertiary }]}>
              <FlipTextInput
                value={name}
                style={styles.commonHeight}
                inputStyle={styles.inputStyle}
                onChangeText={(value) => setName(value)}
              />
            </View>
          </View>
          <View style={styles.subContainer}>
            <FlipText style={{ color: colors.secondary, fontSize: normalize(14) }} type="Regular">
              Location
            </FlipText>
            <View style={[styles.inputContainer, { borderColor: colors.tertiary }]}>
              <FlipTextInput
                value={location}
                style={styles.commonHeight}
                inputStyle={styles.inputStyle}
                onChangeText={(value) => setLocation(value)}
              />
            </View>
          </View>
          <View style={styles.subContainer}>
            <FlipText style={{ color: colors.secondary, fontSize: normalize(14) }} type="Regular">
              Phone
            </FlipText>
            <View style={[styles.inputContainer, { borderColor: colors.tertiary }]}>
              <FlipTextInput
                value={phoneNumber}
                style={styles.commonHeight}
                inputStyle={styles.inputStyle}
                onChangeText={(value) => setPhoneNumber(value)}
              />
            </View>
          </View>
          <View style={styles.subContainer}>
            <FlipText style={{ color: colors.secondary, fontSize: normalize(14) }} type="Regular">
              Bio
            </FlipText>
            <View
              style={[
                styles.inputContainer,
                { borderColor: colors.tertiary, maxHeight: 120, minHeight: Platform.OS === "ios" ? 50 : 45 },
              ]}
            >
              <TextInput
                value={bioName}
                multiline
                style={styles.bioInput}
                onChangeText={(value) => setBioName(value)}
              />
            </View>
          </View>
        </View>
        <FlipButton buttonText="DONE" type="Submit" fontSize={normalize(16)} onPress={updateInfo} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.35,
    marginBottom: 20,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    borderBottomWidth: 1,
    width: "80%",
  },
  inputStyle: { borderWidth: 0, fontSize: normalize(14) },
  commonHeight: { height: Platform.OS === "ios" ? 50 : 45 },
  bioInput: {
    fontSize: normalize(14),
    borderRadius: 10,
    padding: 10,
    fontFamily: "Proxima-Nova-Regular",
    minHeight: Platform.OS === "ios" ? 50 : 45,
  },
});
