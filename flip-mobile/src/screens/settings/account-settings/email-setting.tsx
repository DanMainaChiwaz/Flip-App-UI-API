import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";
import { FlipButton, FlipFormInput, FlipSwitch, FlipContainer, FlipText, FlipBanner } from "components";

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

function EmailSetting() {
  const { colors } = useContext(ThemeContext);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [linkEmail, setLinkEmail] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const saveChanges = (data) => {
    // TODO: update email

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <FlipContainer style={styles.container}>
      <FlipBanner style={{ width: "40%" }} visible={saved} message="Saved Changes" iconName="check" />
      <View style={styles.subContainer}>
        <FlipText style={{ fontSize: normalize(18), color: colors.secondary }} type="Bold">
          Change Email
        </FlipText>
        <FlipFormInput
          isForm
          secondary
          name="email"
          iconName="envelope"
          keyboardType="email-address"
          placeholder="Email"
          control={control}
          error={errors.email}
        />
        <FlipFormInput
          isForm
          secondary
          iconName="lock"
          password
          name="password"
          placeholder="Password"
          control={control}
          isSecureTextEntry={showPassword}
          onShowPassword={() => setShowPassword(!showPassword)}
        />
      </View>
      <View
        style={[
          styles.subContainer,
          {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            padding: 30,
            borderColor: colors.tertiary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <FlipText style={{ fontSize: normalize(16), color: colors.secondary }} type="Bold">
          Link email to the account
        </FlipText>
        <FlipSwitch isEnabled={linkEmail} toggleSwitch={() => setLinkEmail(!linkEmail)} />
      </View>
      <View style={styles.subContainer}>
        <FlipButton
          disabled={!isValid}
          fontSize={normalize(15)}
          buttonText="SAVE"
          type="Submit"
          onPress={handleSubmit(saveChanges)}
        />
      </View>
    </FlipContainer>
  );
}

export default EmailSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
