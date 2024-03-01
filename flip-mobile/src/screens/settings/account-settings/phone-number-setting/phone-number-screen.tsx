import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { FlipContainer } from "components";
import PhoneNumberForm from "./phone-number-form";
import ResetPhoneNumberForm from "./reset-phone-number-form";
import VerifyCodeScreen from "screens/auth/verify-account-screen";

const PhoneNumberScreen = () => {
  const { resetPhoneNumberStep } = useSelector((store: RootState) => store.settings);

  const resendChangePhoneCode = () => {
    // TODO: resend code
  };

  const verifyChangePhoneCode = (code) => {
    // TODO: verify code
  };

  const getStep = () => {
    switch (resetPhoneNumberStep) {
      case 0:
        return <PhoneNumberForm />;
      case 1:
        return <VerifyCodeScreen onResendCode={resendChangePhoneCode} onVerifyCode={verifyChangePhoneCode} />;
      case 2:
        return <ResetPhoneNumberForm />;
    }
  };

  return <FlipContainer style={styles.container}>{getStep()}</FlipContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PhoneNumberScreen;
