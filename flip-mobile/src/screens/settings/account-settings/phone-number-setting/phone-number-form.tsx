import React, { useContext, useState } from "react";
import { FlipPhoneNumberInput, FlipText, FlipFormInput, FlipButton, FlipBanner } from "components";
import { View, Text, StyleSheet } from "react-native";
import { normalize } from "src/utils/helpers";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ThemeContext } from "src/utils/theme-context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { setResetPhoneNumberStep } from "reducers/settings";

const phoneRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const valiationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email"),
  currentPhone: Yup.string().matches(phoneRegEx, { message: "Invalid Phone Number", excludeEmptyString: true }),
  phone: Yup.string().matches(phoneRegEx, { message: "Invalid Phone Number", excludeEmptyString: true }),
});

function PhoneNumberForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({ resolver: yupResolver(valiationSchema), mode: "onBlur" });
  const { colors } = useContext(ThemeContext);

  const [visible, setVisible] = useState<boolean>(false);

  const clearInput = (name: string) => {
    setValue(name, "");
    clearErrors(name);
  };

  const isFormInvalid = () => {
    const { email, phone, currentPhone } = watch();
    return !isValid || !isDirty || (!email && !phone) || !currentPhone;
  };

  const sendCode = (data) => {
    // TODO: send verification code
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      dispatch(setResetPhoneNumberStep(1));
    }, 2000);
  };

  return (
    <>
      <FlipBanner
        visible={visible}
        iconName="check-circle"
        message="Verification code has been sent your email or phone number"
      />
      <View style={[styles.subContainer, { borderColor: colors.tertiary }]}>
        <FlipText type="Bold" style={[styles.commonTxt, { fontSize: normalize(16), color: colors.secondary }]}>
          Current Phone Number
        </FlipText>
        <View style={styles.phoneContainer}>
          <FlipPhoneNumberInput secondary name="currentPhone" control={control} errors={errors.currentPhone} />
        </View>
      </View>
      <View style={[styles.subContainer, { borderColor: "transparent" }]}>
        <FlipText type="Bold" style={{ fontSize: normalize(16), color: colors.secondary }}>
          Verify to change your phone number
        </FlipText>
        <FlipText type="Regular" style={{ marginTop: 10, color: colors.secondary }}>
          A validation code will be sent to your email or phone number to verify your profile.
        </FlipText>
        <FlipText type="Regular" style={[styles.commonTxt, { color: colors.secondary }]}>
          Enter phone number
        </FlipText>
        <View style={styles.phoneContainer}>
          <FlipPhoneNumberInput secondary name="phone" control={control} errors={errors.phone} />
        </View>
      </View>
      <View style={styles.orContainer}>
        <View style={[styles.orLine, { backgroundColor: colors.tertiary }]} />
        <Text style={[styles.orTxt, { color: colors.tertiary }]}>OR</Text>
        <View style={[styles.orLine, { backgroundColor: colors.tertiary }]} />
      </View>
      <View style={[styles.subContainer, { borderColor: colors.tertiary, paddingBottom: 40 }]}>
        <FlipText type="Regular" style={[styles.commonTxt, { color: colors.secondary }]}>
          Enter your email
        </FlipText>
        <FlipFormInput
          name="email"
          iconName="envelope"
          placeholder="Email"
          keyboardType="email-address"
          onTouchStart={() => clearInput("email")}
          control={control}
          error={errors.email}
          defaultValue=""
          secondary
        />
      </View>
      <View style={[styles.subContainer, { borderColor: "transparent" }]}>
        <FlipButton
          type="Submit"
          buttonText="SEND VALIDATION CODE"
          fontSize={normalize(16)}
          style={{ marginTop: 30 }}
          disabled={isFormInvalid()}
          onPress={handleSubmit(sendCode)}
        />
      </View>
    </>
  );
}

export default PhoneNumberForm;

const styles = StyleSheet.create({
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
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
  subContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orLine: {
    height: 1,
    width: "50%",
  },
  orTxt: {
    fontSize: normalize(14),
    marginLeft: 5,
    marginRight: 5,
  },
  commonTxt: { marginTop: 10, marginBottom: 5 },
});
