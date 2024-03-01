import React, { useContext } from "react";
import { Switch, StyleSheet } from "react-native";
import { ThemeContext } from "utils/theme-context";

interface FlipSwitchProps {
  isEnabled: boolean;
  toggleSwitch: () => any;
}

function FlipSwitch(props: FlipSwitchProps) {
  const { colors } = useContext(ThemeContext);

  const { isEnabled, toggleSwitch } = props;
  return (
    <Switch
      trackColor={{ false: colors.tertiary, true: colors.foreground }}
      thumbColor={colors.background}
      ios_backgroundColor={colors.tertiary}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={styles.switch}
    />
  );
}

export default FlipSwitch;

const styles = StyleSheet.create({
  switch: {},
});
