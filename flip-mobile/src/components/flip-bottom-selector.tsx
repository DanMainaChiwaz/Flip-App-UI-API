import React, { useContext } from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ThemeContext } from "utils/theme-context";
import FlipButton from "./flip-button";

interface FlipBottomSelectorProps {
  visible: boolean;
  onCancel?: any;
  children?: any;
  onBackPress?: any;
}

function FlipBottomSelector(props: FlipBottomSelectorProps) {
  const { colors } = useContext(ThemeContext);

  const { children, visible, onCancel, onBackPress } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onBackPress}>
        <View style={styles.confirmationContainer}>
          <View style={styles.content}>
            <View style={styles.buttonsContainer}>{children}</View>
            <FlipButton onPress={onCancel} type="Submit" buttonText="CANCEL" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default FlipBottomSelector;

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  content: {
    flex: 0.5,
    width: "100%",
    justifyContent: "flex-end",
    bottom: 50,
  },
  buttonsContainer: {
    marginBottom: 20,
  },
});
