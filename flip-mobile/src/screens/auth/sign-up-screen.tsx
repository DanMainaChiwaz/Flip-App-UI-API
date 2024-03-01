import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ThemeContext } from "utils/theme-context";
import { signUp } from "reducers/auth";
import { AppDispatch, RootState } from "store";
import { formatPhone, normalize } from "utils/helpers";
import { FlipButton, FlipText, FlipFormInput, FlipPhoneNumberInput } from "components";

const phoneRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required().email(),
  phone: Yup.string().required().matches(phoneRegEx),
  password: Yup.string()
    .required("Password is a required field")
    .matches(
      passwordRegEx,
      "Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character",
    ),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpScreen = ({ navigation: { navigate } }) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const termsUrl = "https://goflipapp.com/?page_id=306";
  const dispatch = useDispatch<AppDispatch>();
  const isAuthPending = useSelector((store: RootState) => store.auth.isAuthPending);
  const { colors } = useContext(ThemeContext);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isTermsAndConditionsConfirmed, setIsTermsAndConditionsConfirmed] = useState(false);
  const [isSecureTextEntryPassword, setIsSecureTextEntryPassword] = useState(true);
  const [isSecureTextEntryConfirmPassword, setIsSecureTextEntryConfirmPassword] = useState(true);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const navigateToSignIn = () => {
    navigate("SignIn");
  };

  const submitSignUp = (data) => {
    const phone = formatPhone(1, data.phone);

    dispatch(signUp({ ...data, phone }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.background}>
        <Image style={styles.logo} source={require("assets/logos/flip-logo.png")} />
        <Text>{user ? user.email : "None"}</Text>
        <View style={styles.linkContainer}>
          <FlipText type="Regular" style={[styles.link, { color: colors.secondary }]} onPress={navigateToSignIn}>
            SIGN IN
          </FlipText>
          <FlipText type="Regular" style={[styles.link, { color: colors.secondary }]}>
            SIGN UP
          </FlipText>
        </View>
        <View style={styles.barContainer}>
          <View style={[styles.barLeft, { borderColor: colors.tertiary }]} />
          <View style={[styles.barRight, { backgroundColor: colors.tertiary, borderColor: colors.tertiary }]} />
        </View>
        <FlipText type="Regular" style={styles.requiredText}>
          * All fields are required
        </FlipText>
        <FlipFormInput
          isForm
          iconName="user-alt"
          name="firstName"
          placeholder="First Name"
          control={control}
          error={errors.firstName}
        />
        <FlipFormInput
          isForm
          iconName="user-alt"
          name="lastName"
          placeholder="Last Name"
          control={control}
          error={errors.lastName}
        />
        <FlipFormInput
          isForm
          iconName="envelope"
          name="email"
          placeholder="Email"
          control={control}
          keyboardType="email-address"
          error={errors.email}
        />
        {errors.email && (
          <FlipText type="Regular" style={styles.errorText}>
            Invalid Email Address
          </FlipText>
        )}
        <View style={styles.phoneContainer}>
          <FlipPhoneNumberInput name="phone" control={control} errors={errors.phone} />
        </View>
        {errors.phone && (
          <FlipText type="Regular" style={styles.errorText}>
            Invalid Phone Number
          </FlipText>
        )}
        <FlipFormInput
          isForm
          iconName="lock"
          password
          name="password"
          placeholder="Password"
          control={control}
          error={errors.password}
          secureTextEntry={isSecureTextEntryPassword}
          onShowPassword={() => setIsSecureTextEntryPassword(!isSecureTextEntryPassword)}
        />
        <FlipFormInput
          isForm
          iconName="lock"
          password
          name="passwordConfirmation"
          placeholder="Confirm Password"
          control={control}
          error={errors.passwordConfirmation}
          secureTextEntry={isSecureTextEntryConfirmPassword}
          onShowPassword={() => setIsSecureTextEntryConfirmPassword(!isSecureTextEntryConfirmPassword)}
        />
        {errors.password && (
          <FlipText type="Regular" style={styles.errorText}>
            {errors.password?.message}
          </FlipText>
        )}
        {!errors.password && errors.passwordConfirmation && (
          <FlipText type="Regular" style={styles.errorText}>
            {errors.passwordConfirmation?.message}
          </FlipText>
        )}
        <Pressable style={styles.ageCheckContainer} onPress={() => setIsAgeConfirmed(!isAgeConfirmed)}>
          <Checkbox
            style={[styles.checkbox, { borderColor: colors.secondary }]}
            color={isAgeConfirmed && colors.secondary}
            value={isAgeConfirmed}
          />
          <FlipText type="Regular" style={styles.ageText}>
            I certify that I am above 18 years old.
          </FlipText>
        </Pressable>
        <View style={[styles.ageCheckContainer, { marginTop: 0 }]}>
          <Checkbox
            style={[styles.checkbox, { borderColor: colors.secondary }]}
            color={isTermsAndConditionsConfirmed && colors.secondary}
            value={isTermsAndConditionsConfirmed}
            onValueChange={() => setIsTermsAndConditionsConfirmed(!isTermsAndConditionsConfirmed)}
          />
          <FlipText type="Regular" style={styles.ageText}>
            I agree to the
          </FlipText>
          <FlipText
            type="Bold"
            onPress={() => Linking.openURL(termsUrl)}
            style={[styles.signInText, { color: colors.interactive, marginLeft: 5 }]}
          >
            Terms & Conditions
          </FlipText>
        </View>
        <FlipButton
          style={{ backgroundColor: colors.interactive }}
          buttonText="SIGN UP"
          fontSize={normalize(16)}
          type="Submit"
          onPress={handleSubmit(submitSignUp)}
          disabled={!(isValid && isAgeConfirmed && isTermsAndConditionsConfirmed) || isAuthPending}
        />
        <FlipText type="Regular" style={[styles.bottomText, { color: colors.secondary }]}>
          Already have an account?{" "}
          <FlipText type="Bold" onPress={navigateToSignIn} style={[styles.signInText, { color: colors.interactive }]}>
            Sign In
          </FlipText>
        </FlipText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    resizeMode: "contain",
    minWidth: 100,
    marginTop: 20,
    width: 150,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  link: {
    fontSize: normalize(16),
    flex: 1,
    textAlign: "center",
    paddingTop: 5,
  },
  barContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 5,
  },
  barLeft: {
    flex: 1,
    height: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  barRight: {
    flex: 1,
    height: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  requiredText: {
    marginLeft: 10,
    fontSize: normalize(12),
    alignSelf: "flex-start",
    textAlignVertical: "bottom",
    fontStyle: "italic",
  },
  phoneContainer: {
    marginTop: 15,
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
    borderWidth: 1,
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
  ageCheckContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    borderRadius: 5,
    flexDirection: "row",
    height: 16,
    width: 16,
  },
  ageText: {
    marginLeft: 5,
    fontSize: normalize(14),
  },
  bottomText: {
    marginTop: 25,
    fontSize: normalize(14),
    textAlign: "center",
    paddingBottom: 20,
  },
  signInText: {
    fontSize: normalize(14),
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
