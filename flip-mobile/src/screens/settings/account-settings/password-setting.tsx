import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlipFormInput, FlipButton, FlipText, FlipContainer, FlipBanner } from "components";
import { FontAwesome5 } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";

const schemaForPassword = Yup.object().shape({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const PasswordSettingScreen = ({ navigation: { goBack } }) => {
  const { colors } = useContext(ThemeContext);
  const [isSecureTextEntryOldPassword, setIsSecureTextEntryOldPassword] = useState(true);
  const [isSecureTextEntryNewPassword, setIsSecureTextEntryNewPassword] = useState(true);
  const [isSecureTextEntryConfirmNewPassword, setIsSecureTextEntryConfirmNewPassword] = useState(true);
  const [visible, setVisible] = useState<boolean>(false);

  const {
    control: controlPassword,
    watch: watchPassword,
    handleSubmit: handleSubmitPassword,
    formState: { isValid: isValidPassword },
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
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      goBack();
    }, 2000);
  };

  return (
    <FlipContainer style={{ marginTop: 30 }}>
      <FlipBanner visible={visible} iconName="check-circle" message="Password changed" />
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
          name="oldPassword"
          placeholder="Old Password"
          control={controlPassword}
          secureTextEntry={isSecureTextEntryOldPassword}
          onShowPassword={() => setIsSecureTextEntryOldPassword(!isSecureTextEntryOldPassword)}
        />
        <FlipFormInput
          isForm
          secondary
          iconName="lock"
          password
          name="newPassword"
          placeholder="New Password"
          control={controlPassword}
          secureTextEntry={isSecureTextEntryNewPassword}
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
          secureTextEntry={isSecureTextEntryConfirmNewPassword}
          onShowPassword={() => setIsSecureTextEntryConfirmNewPassword(!isSecureTextEntryConfirmNewPassword)}
        />
        <FlipText type="Regular" style={[styles.label, { color: colors.secondary, marginTop: 10 }]}>
          Both passwords must match
        </FlipText>
      </View>
      <View style={[styles.orLine, { backgroundColor: colors.tertiary, width: "100%", marginBottom: 50 }]} />
      <FlipButton
        disabled={
          !watchPassword().newPassword ||
          !watchPassword().confirmNewPassword ||
          !watchPassword().oldPassword ||
          !isValidPassword
            ? true
            : false
        }
        onPress={handleSubmitPassword(changePassword)}
        type="Submit"
        buttonText="CHANGE PASSWORD"
        fontSize={normalize(16)}
        style={{ marginHorizontal: 20 }}
      />
    </FlipContainer>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  orLine: {
    height: 1,
    width: "50%",
    backgroundColor: "red",
  },
  label: {
    marginBottom: 10,
    fontSize: normalize(14),
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

export default PasswordSettingScreen;
