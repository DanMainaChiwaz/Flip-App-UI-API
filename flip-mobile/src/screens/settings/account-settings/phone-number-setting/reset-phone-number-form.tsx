import React, { useState } from "react";
import { FlipBanner, FlipButton, FlipPhoneNumberInput, FlipText } from "components";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { normalize } from "src/utils/helpers";

const phoneRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const valiationSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneRegEx, { message: "Invalid Phone Number", excludeEmptyString: true }),
});

function ResetPhoneNumberForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({ resolver: yupResolver(valiationSchema), mode: "onBlur" });

  const [visible, setVisible] = useState(false);

  const isFormInvalid = () => {
    const { phone } = watch();
    return !isValid || !isDirty || !phone;
  };

  const changePhoneNumber = () => {
    // TODO: change user phone number
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FlipBanner visible={visible} iconName="check-circle" message="Your phone number has been changed" />
      <FlipText type="Bold" style={{ fontSize: normalize(16), marginBottom: 20 }}>
        Change your phone number
      </FlipText>
      <FlipText type="Regular">Enter phone number</FlipText>
      <View style={styles.phoneContainer}>
        <FlipPhoneNumberInput secondary name="phone" control={control} errors={errors.phone} />
      </View>
      <FlipButton
        type="Submit"
        buttonText="SUBMIT"
        fontSize={normalize(16)}
        style={{ marginTop: 30 }}
        disabled={isFormInvalid()}
        onPress={handleSubmit(changePhoneNumber)}
      />
    </View>
  );
}

export default ResetPhoneNumberForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
});
