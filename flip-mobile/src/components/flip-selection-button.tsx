import React from "react";
import { Pressable, StyleSheet } from "react-native";
import FlipRadioButton from "./flip-radio-button";
import FlipText from "./flip-text";

interface FlipSelectionButtonProps {
  title: string;
  selected: boolean;
  primaryColor: string;
  secondaryColor: string;
  onPress: () => any;
}

function FlipSelectionButton(props: FlipSelectionButtonProps) {
  const { title, selected, primaryColor, secondaryColor, onPress } = props;

  return (
    <Pressable style={[styles.button, { backgroundColor: primaryColor }]} onPress={onPress}>
      <FlipText style={{ color: secondaryColor }} type="Regular">
        {title}
      </FlipText>
      <FlipRadioButton selected={selected} radioColor={secondaryColor} />
    </Pressable>
  );
}

export default FlipSelectionButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});
