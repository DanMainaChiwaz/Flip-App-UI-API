import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "screens/auth/sign-in-screen";
import SignUpScreen from "screens/auth/sign-up-screen";
import ForgotPasswordScreen from "screens/forgot-password/forgot-password-screen";
import VerifyAccountScreen from "screens/auth/verify-account-screen";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { confirmVerificationCode, resendVerificationCode } from "reducers/auth";

const Stack = createStackNavigator();

const AuthNav = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.email ? (
        <Stack.Screen name="VerifyAccount">
          {() => <VerifyAccountScreen onResendCode={resendVerificationCode} onVerifyCode={confirmVerificationCode} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNav;
