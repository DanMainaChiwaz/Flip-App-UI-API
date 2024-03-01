import React, { useContext } from "react";
import { Modal, View, StyleSheet, Platform } from "react-native";
import { ThemeContext } from "utils/theme-context";
import FlipText from "./flip-text";
import { normalize } from "utils/helpers";

interface FlipModalProps {
  title: string;
  message: string;
  visible: boolean;
  style?: any;
  children?: any;
}

function FlipModal(props: FlipModalProps) {
  const { colors } = useContext(ThemeContext);

  const { title, message, visible, style, children } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.confirmationContainer}>
        <View style={[styles.confirmationContent, { backgroundColor: colors.secondary }]}>
          <FlipText type="Bold" style={[styles.confirmationTxt, { color: colors.background, fontSize: normalize(20) }]}>
            {title}
          </FlipText>
          <FlipText type="Regular" style={[styles.confirmationTxt, { color: colors.background, marginTop: 10 }]}>
            {message}
          </FlipText>
          <View style={[styles.buttonsContainer, { ...style }]}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

export default FlipModal;

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  confirmationContent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "90%",
    padding: 20,
  },
  confirmationTxt: {
    fontSize: normalize(12),
    marginLeft: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
});
