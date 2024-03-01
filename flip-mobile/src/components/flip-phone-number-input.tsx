import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { normalize } from "src/utils/helpers";
import { ThemeContext } from "src/utils/theme-context";
import FlipFormInput from "./flip-form-input";

interface FlipPhoneNumberInputProps {
  name: string;
  control: any;
  errors: any;
  secondary?: boolean;
}

function FlipPhoneNumberInput(props: FlipPhoneNumberInputProps) {
  const { colors } = useContext(ThemeContext);
  const { name, control, errors, secondary = false } = props;
  return (
    <>
      <View
        style={[
          styles.countryCode,
          { backgroundColor: secondary ? colors.tertiary : colors.background, borderWidth: secondary ? 0 : 1 },
        ]}
      >
        {/* Hard-coded */}
        <Text style={{ fontSize: normalize(16) }}>(+1)</Text>
        <Image style={{ width: 27, height: 19, marginLeft: 10 }} source={require("assets/icons/american-flag.png")} />
      </View>
      <FlipFormInput
        iconName="phone-volume"
        style={styles.phoneNumber}
        keyboardType="numeric"
        name={name}
        placeholder="Phone Number"
        control={control}
        error={errors}
        secondary={secondary}
      />
    </>
  );
}

export default FlipPhoneNumberInput;

const styles = StyleSheet.create({
  countryCode: {
    width: "30%",
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  phoneNumber: {
    width: "65%",
  },
});
