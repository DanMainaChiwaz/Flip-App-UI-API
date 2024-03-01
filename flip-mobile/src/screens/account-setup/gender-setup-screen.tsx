import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { ThemeContext } from "utils/theme-context";
import FlipRadioButton from "../../components/flip-radio-button";
import FlipButton from "../../components/flip-button";

const GenderSetupScreen = () => {
  const { colors } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState();

  const buildOption = (title, value) => {
    return (
      <Pressable
        onPress={() => setSelectedOption(value)}
        style={[styles.questionOption, { backgroundColor: colors.secondary }]}
      >
        <Text style={{ color: colors.background, fontSize: 18 }}>{title}</Text>
        <FlipRadioButton radioColor={colors.background} selected={selectedOption === value} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.stepContainer}>
        <View style={[styles.step, { borderColor: colors.interactive }]} />
        <View style={[styles.step, { borderColor: colors.interactive }]} />
        <View style={[styles.step, { borderColor: `${colors.interactive}aa` }]} />
      </View>
      <View style={styles.bannerContainer}>
        <Image style={styles.bannerImage} source={require("assets/icons/filler.png")} />
        <View style={styles.profilePictureContainer}>
          <Icon style={styles.profilePicture} name="user-circle-o" color={colors.interactive} size={150} />
          <Icon style={styles.addPictureButton} name="plus-square" color={colors.interactive} size={25} />
        </View>
      </View>
      <View style={[styles.optionsContainer, { backgroundColor: colors.primary }]}>
        <Text style={[styles.question, { color: colors.interactive }]}>How do you identify yourself?</Text>
        {buildOption("Female", 0)}
        {buildOption("Male", 1)}
        {buildOption("Non-Binary / Transgender", 2)}
        {buildOption("I prefer not to describe", 3)}
        {buildOption("Other", 4)}
      </View>
      <FlipButton style={styles.nextButton} buttonText="Next" type="Submit" fontSize={22} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  step: {
    width: 75,
    borderBottomWidth: 6,
  },
  bannerContainer: {
    alignSelf: "center",
    marginTop: 20,
    width: 350,
    overflow: "hidden",
  },
  bannerImage: {
    alignSelf: "center",
    width: 350,
    height: 200,
  },
  profilePictureContainer: {
    position: "absolute",
    left: 100,
    top: 25,
  },
  profilePicture: {},
  addPictureButton: {
    position: "absolute",
    bottom: 0,
    right: 25,
  },
  optionsContainer: {
    alignSelf: "center",
    marginTop: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: 350,
    borderRadius: 15,
    elevation: 5,
  },
  question: {
    fontFamily: "Proxima-Nova-Extrabold",
    fontSize: 22,
    textAlign: "center",
  },
  questionOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 10,
    elevation: 1,
  },
  nextButton: {
    alignSelf: "center",
    marginTop: 25,
    height: 50,
    width: 350,
  },
});

export default GenderSetupScreen;
