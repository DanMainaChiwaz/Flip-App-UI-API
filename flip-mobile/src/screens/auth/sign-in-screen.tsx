import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import Checkbox from "expo-checkbox";
import { signIn } from "reducers/auth";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";
import { FlipContainer, FlipTextInput, FlipButton, FlipText } from "components";

const SignInScreen = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const navigateToSignUp = () => navigate("SignUp");
  const navigateToForgotPassword = () => navigate("ForgotPassword");

  const signInUser = () => {
    // if (isRememberMeChecked) {
    //   TODO: Enable remembering
    // }
    dispatch(signIn({ email: email, password }));
  };

  return (
    <FlipContainer style={styles.container}>
      <Image style={styles.logo} source={require("assets/logos/flip-logo.png")} />
      <FlipText type="Thin" style={[styles.heading, { color: colors.secondary }]}>
        Find Local Individual Players
      </FlipText>
      <View style={styles.linkContainer}>
        <FlipText type="Regular" style={[styles.link, { color: colors.secondary }]}>
          SIGN IN
        </FlipText>
        <FlipText type="Regular" style={[styles.link, { color: colors.secondary }]} onPress={navigateToSignUp}>
          SIGN UP
        </FlipText>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barLeft, { backgroundColor: colors.tertiary, borderColor: colors.tertiary }]} />
        <View style={[styles.barRight, { borderColor: colors.tertiary }]} />
      </View>
      <FlipTextInput
        isForm
        keyboardType="email-address"
        placeholder="Email or Phone number"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <FlipTextInput
        isForm
        password
        placeholder="Password"
        secureTextEntry={isSecureTextEntry}
        value={password}
        onChangeText={(value) => setPassword(value)}
        onShowPassword={() => setIsSecureTextEntry(!isSecureTextEntry)}
      />
      <View style={styles.forgottenAndRememberMeContainer}>
        <Pressable style={styles.rememberMeContainer} onPress={() => setIsRememberMeChecked(!isRememberMeChecked)}>
          <Checkbox
            style={[styles.checkbox, { borderColor: colors.secondary }]}
            color={isRememberMeChecked ? colors.secondary : undefined}
            value={isRememberMeChecked}
          />
          <FlipText type="Regular" style={[styles.rememberMeText, { color: colors.secondary }]}>
            Remember me
          </FlipText>
        </Pressable>
        <FlipText
          type="Regular"
          style={[styles.forgottenPasswordText, { color: colors.secondary }]}
          onPress={navigateToForgotPassword}
        >
          Forgotten your password?
        </FlipText>
      </View>
      <FlipButton
        disabled={!(email && password)}
        onPress={signInUser}
        type="Submit"
        buttonText="SIGN IN"
        fontSize={16}
      />
      <View style={styles.bottomContainer}>
        <FlipText type="Regular" style={[styles.bottomText, { color: colors.secondary }]}>
          Don't have an account?{" "}
          <FlipText type="Bold" style={[styles.bottomLink, { color: colors.interactive }]} onPress={navigateToSignUp}>
            Sign up
          </FlipText>
        </FlipText>
      </View>
    </FlipContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    resizeMode: "contain",
    minWidth: 100,
    marginTop: 50,
    width: 150,
    marginBottom: 30,
  },
  heading: {
    bottom: 40,
    marginBottom: 10,
    fontSize: normalize(24),
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
    borderWidth: 0.5,
    borderLeftWidth: 0,
  },
  forgottenAndRememberMeContainer: {
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 50,
  },
  rememberMeContainer: {
    flexDirection: "row",
    flex: 1,
  },
  checkbox: {
    borderRadius: 5,
    flexDirection: "row",
    alignSelf: "flex-start",
    height: 16,
    width: 16,
  },
  rememberMeText: {
    fontSize: normalize(14),
    marginLeft: 5,
  },
  forgottenPasswordText: {
    flex: 1,
    textAlign: "right",
    fontSize: normalize(14),
    textDecorationLine: "underline",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 45,
  },
  bottomText: {
    fontSize: normalize(14),
    textAlign: "center",
  },
  bottomLink: {
    fontSize: normalize(14),
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
