import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlipFormInput, FlipButton, FlipText } from "components";
import { FontAwesome5 } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";

const schemaForPassword = Yup.object().shape({
  newPassword: Yup.string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ResetPasswordForm = () => {
  const { colors } = useContext(ThemeContext);
  const [isSecureTextEntryNewPassword, setIsSecureTextEntryNewPassword] = useState(true);
  const [isSecureTextEntryConfirmNewPassword, setIsSecureTextEntryConfirmNewPassword] = useState(true);

  const {
    control: controlPassword,
    watch: watchPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm({
    resolver: yupResolver(schemaForPassword),
    mode: "onBlur",
  });

  const checkUppercase = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)) {
        return true;
      }
    }
    return false;
  };

  const changePassword = () => {
    // TODO: change password
    console.log("Password Changed!");
  };

  return (
    <View style={{ marginTop: 30 }}>
      <View style={[styles.subContainer, { marginBottom: 50 }]}>
        <FlipText
          type="Bold"
          style={{
            color: colors.secondary,
            fontSize: normalize(20),
          }}
        >
          Change password
        </FlipText>
        <FlipFormInput
          isForm
          secondary
          iconName="lock"
          password
          name="newPassword"
          placeholder="New Password"
          control={controlPassword}
          isSecureTextEntry={isSecureTextEntryNewPassword}
          onShowPassword={() => setIsSecureTextEntryNewPassword(!isSecureTextEntryNewPassword)}
        />
        <FlipText type="Regular" style={{ color: colors.secondary, marginTop: 20, fontFamily: "Proxima-Nova-Regular" }}>
          Password strength
        </FlipText>
        <View style={styles.checkLine}>
          <FontAwesome5
            name="check-square"
            size={14}
            color={!watchPassword().newPassword || watchPassword().newPassword.length <= 6 ? "red" : "green"}
          />
          <FlipText type="Regular" style={[styles.checkList, { color: colors.secondary }]}>
            At least 6 characters
          </FlipText>
        </View>
        <View style={styles.checkLine}>
          <FontAwesome5
            name="check-square"
            size={14}
            color={!watchPassword().newPassword || !checkUppercase(watchPassword().newPassword) ? "red" : "green"}
          />
          <FlipText type="Regular" style={[styles.checkList, { color: colors.secondary }]}>
            At least one uppercase and one lowercase letter
          </FlipText>
        </View>
        <View style={styles.checkLine}>
          <FontAwesome5
            name="check-square"
            size={14}
            color={!watchPassword().newPassword || !/[0-9]/.test(watchPassword().newPassword) ? "red" : "green"}
          />
          <FlipText type="Regular" style={[styles.checkList, { color: colors.secondary }]}>
            At least one number
          </FlipText>
        </View>
        <View style={styles.checkLine}>
          <FontAwesome5
            name="check-square"
            size={14}
            color={!watchPassword().newPassword || !/[!@#$%^&*]/.test(watchPassword().newPassword) ? "red" : "green"}
          />
          <FlipText type="Regular" style={[styles.checkList, { color: colors.secondary }]}>
            At least one symbol
          </FlipText>
        </View>
        <FlipFormInput
          isForm
          secondary
          iconName="lock"
          password
          name="confirmNewPassword"
          placeholder="Confirm new password"
          control={controlPassword}
          isSecureTextEntry={isSecureTextEntryConfirmNewPassword}
          onShowPassword={() => setIsSecureTextEntryConfirmNewPassword(!isSecureTextEntryConfirmNewPassword)}
        />
        <FlipText type="Regular" style={[styles.label, { color: colors.secondary, marginTop: 10 }]}>
          Both passwords must match
        </FlipText>
      </View>
      <View style={[styles.orLine, { backgroundColor: colors.tertiary, width: "100%", marginBottom: 50 }]} />
      <FlipButton
        disabled={
          !watchPassword().newPassword || !watchPassword().confirmNewPassword || !isValidPassword ? true : false
        }
        onPress={handleSubmitPassword(changePassword)}
        type="Submit"
        buttonText="CHANGE PASSWORD"
        fontSize={normalize(16)}
        style={{ marginHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  confirmationContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 57,
    width: "90%",
  },
  confirmationTxt: {
    fontSize: normalize(12),
    marginLeft: 10,
  },
  title: {
    fontSize: normalize(26),
    marginBottom: 5,
  },
  headline: {
    fontSize: normalize(14),
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
  bottomContainer: {
    flexDirection: "row",
  },
  bottomText: {
    fontSize: normalize(14),
    color: "#264653",
    textAlign: "center",
    marginRight: 5,
  },
  bottomLink: {
    fontSize: normalize(14),
    color: "#2A9D8F",
    textDecorationLine: "underline",
  },
  checkLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkList: {
    marginLeft: 5,
    fontSize: normalize(14),
  },
});

export default ResetPasswordForm;
