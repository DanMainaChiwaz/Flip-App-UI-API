import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";
import { FlipText, FlipFormInput, FlipButton, FlipPhoneNumberInput } from "components";
import { AppDispatch } from "src/store";
import { sendForgotPasswordCode } from "src/store/reducers/auth";

const phoneRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const valiationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email"),
  phone: Yup.string().matches(phoneRegEx, { message: "Invalid Phone Number", excludeEmptyString: true }),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useContext(ThemeContext);

  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({ resolver: yupResolver(valiationSchema), mode: "onBlur" });

  const clearInput = (name: string) => {
    setValue(name, "");
    clearErrors(name);
  };

  const isFormInvalid = () => {
    const { email, phone } = watch();
    return !isValid || !isDirty || (!email && !phone);
  };

  const sendCode = (data) => {
    const { phone, email } = data;

    if (phone) {
      dispatch(sendForgotPasswordCode({ value: phone, type: "phone" }));
    } else {
      dispatch(sendForgotPasswordCode({ value: email, type: "email" }));
    }
    // TODO: send verification code to email
  };

  return (
    <View style={styles.container}>
      <Text>{`dirty: ${isDirty} | valid: ${isValid}`}</Text>
      <Text>{`errors: ${errors.phone}`}</Text>
      <FlipText type="Extrabold" style={[styles.title, { color: colors.interactive }]}>
        Forgot your password?
      </FlipText>
      <FlipText type="Regular" style={[styles.headline, { color: colors.secondary }]}>
        Please enter your email or phone to reset your password.
      </FlipText>
      <View style={styles.subContainer}>
        <FlipText type="Regular" style={[styles.label, { color: colors.secondary }]}>
          Enter phone number
        </FlipText>
        <View style={styles.phoneContainer}>
          <FlipPhoneNumberInput secondary name="phone" control={control} errors={errors.phone} />
        </View>
        {errors.phone && (
          <FlipText type="Regular" style={styles.errorText}>
            Invalid Phone Number
          </FlipText>
        )}
      </View>
      <View style={styles.orContainer}>
        <View style={[styles.orLine, { backgroundColor: colors.tertiary }]} />
        <Text style={[styles.orTxt, { color: colors.tertiary }]}>OR</Text>
        <View style={[styles.orLine, { backgroundColor: colors.tertiary }]} />
      </View>
      <View style={[styles.subContainer, { marginBottom: 50 }]}>
        <FlipText type="Regular" style={[styles.label, { color: colors.secondary }]}>
          Enter your email
        </FlipText>
        <FlipFormInput
          name="email"
          iconName="envelope"
          placeholder="Email"
          keyboardType="email-address"
          control={control}
          error={errors.email}
          onTouchStart={() => clearInput("phone")}
          defaultValue=""
          secondary
        />
        {errors.email && (
          <FlipText type="Regular" style={styles.errorText}>
            Invalid Email Address
          </FlipText>
        )}
      </View>
      <FlipButton
        type="Submit"
        buttonText="SEND VALIDATION CODE"
        fontSize={normalize(16)}
        style={{ marginHorizontal: 20 }}
        disabled={isFormInvalid()}
        onPress={handleSubmit(sendCode)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: normalize(26),
    marginBottom: 5,
  },
  headline: {
    fontSize: normalize(16),
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
  subContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  orLine: {
    height: 1,
    width: "50%",
    backgroundColor: "red",
  },
  orTxt: {
    fontSize: normalize(14),
    marginLeft: 5,
    marginRight: 5,
  },
  label: {
    marginBottom: 10,
    fontSize: normalize(14),
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  countryCode: {
    width: "30%",
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  phoneNumber: {
    width: "65%",
  },
  errorText: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingTop: 1,
    fontSize: normalize(14),
    color: "red",
    fontStyle: "italic",
  },
});

export default ForgotPasswordForm;
