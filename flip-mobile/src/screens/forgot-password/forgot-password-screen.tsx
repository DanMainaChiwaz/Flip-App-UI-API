import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootState } from "store";
import { normalize } from "utils/helpers";
import { FlipContainer } from "components";
import ForgotPasswordForm from "./forgot-password-form";
import ResetPasswordForm from "./reset-password-form";
import VerifyCodeScreen from "screens/auth/verify-account-screen";

const ForgotPasswordScreen = ({ navigation: { navigate } }) => {
  const { forgotPasswordStep } = useSelector((store: RootState) => store.auth);

  const resendForgotPasswordCode = () => {
    // TODO: resend code
  };

  const verifyForgotPasswordCode = (code) => {
    // TODO: verify code
  };

  const getStep = () => {
    switch (forgotPasswordStep) {
      case 0:
        return <ForgotPasswordForm />;
      case 1:
        return <VerifyCodeScreen onResendCode={resendForgotPasswordCode} onVerifyCode={verifyForgotPasswordCode} />;
      case 2:
        return <ResetPasswordForm />;
    }
  };

  return (
    <FlipContainer style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate("SignIn")}>
          <FontAwesome5 name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {getStep()}
    </FlipContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 55 : 10,
    paddingHorizontal: 20,
  },
});

export default ForgotPasswordScreen;
