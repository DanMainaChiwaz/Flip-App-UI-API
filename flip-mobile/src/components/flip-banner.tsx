import React, { useContext } from "react";
import { Modal, View, StyleSheet } from "react-native";
import FlipText from "./flip-text";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";

interface FlipBannerProps {
  iconName?: string;
  message: string;
  visible: boolean;
  style?: any;
}

const FlipBanner = (props: FlipBannerProps) => {
  const { colors } = useContext(ThemeContext);

  const { iconName, message, visible, style } = props;

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.confirmationContainer}>
        <View style={[styles.confirmationContent, { backgroundColor: colors.secondary, ...style }]}>
          {iconName && <FontAwesome5 name={iconName} size={18} color={colors.background} />}
          <FlipText type="Regular" style={[styles.confirmationTxt, { color: colors.background }]}>
            {message}
          </FlipText>
        </View>
      </View>
    </Modal>
  );
};

export default FlipBanner;

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  confirmationContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 57,
    width: "90%",
  },
  confirmationTxt: {
    fontSize: normalize(12),
    marginLeft: 10,
  },
});
