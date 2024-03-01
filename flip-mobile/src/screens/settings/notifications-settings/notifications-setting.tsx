import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlipSwitch, FlipText } from "components";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";

function NotificationsSetting() {
  const { colors } = useContext(ThemeContext);

  const [notifications, setNotifications] = useState<boolean>(false);

  const switchNotifications = () => {
    setNotifications(!notifications);
    // TODO: switch notifications
  };

  return (
    <View style={styles.container}>
      <FlipText style={{ fontSize: normalize(16), color: colors.secondary }} type="Bold">
        Turn all notifications
      </FlipText>
      <View style={styles.subContainer}>
        <FlipText style={{ marginRight: 20, color: notifications ? colors.foreground : colors.tertiary }} type="Bold">
          {notifications ? "ON" : "OFF"}
        </FlipText>
        <FlipSwitch isEnabled={notifications} toggleSwitch={switchNotifications} />
      </View>
    </View>
  );
}

export default NotificationsSetting;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
