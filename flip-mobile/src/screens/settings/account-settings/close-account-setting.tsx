import React, { useContext, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { FlipButton, FlipContainer, FlipRadioButton, FlipText, FlipTextInput } from "components";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";

function CloseAccountSetting({ navigation: { navigate } }) {
  const { colors } = useContext(ThemeContext);

  const [reason, setReason] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const submit = () => {
    // TODO: verify credentials, if incorrect setError(true)
    navigate("Delete Account");
  };

  return (
    <FlipContainer style={{ flex: 1 }}>
      <View style={styles.subContainer}>
        <FlipText style={[styles.title, { color: colors.secondary }]} type="Bold">
          Delete Profile
        </FlipText>
        <FlipText style={{ marginBottom: 10 }} type="Regular">
          Please tell us the reason why you want to delete your account.
        </FlipText>
        <Pressable onPress={() => setReason("I have a privacy concern")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "I have a privacy concern"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            I have a privacy concern
          </FlipText>
        </Pressable>
        <Pressable
          onPress={() => setReason("Temporarily disable my account, I will be back")}
          style={styles.selectionButtons}
        >
          <FlipRadioButton
            radioColor={colors.tertiary}
            selected={reason === "Temporarily disable my account, I will be back"}
          />
          <FlipText style={styles.commonBtnText} type="Regular">
            Temporarily disable my account, I will be back
          </FlipText>
        </Pressable>
        <Pressable onPress={() => setReason("I could not find what I came for")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "I could not find what I came for"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            I could not find what I came for
          </FlipText>
        </Pressable>
        <Pressable onPress={() => setReason("My account was hacked")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "My account was hacked"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            My account was hacked
          </FlipText>
        </Pressable>
        <Pressable onPress={() => setReason("Permanently delete my profile")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "Permanently delete my profile"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            Permanently delete my profile
          </FlipText>
        </Pressable>
        <Pressable onPress={() => setReason("Too distracting for me")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "Too distracting for me"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            Too distracting for me
          </FlipText>
        </Pressable>
        <Pressable onPress={() => setReason("Something else")} style={styles.selectionButtons}>
          <FlipRadioButton radioColor={colors.tertiary} selected={reason === "Something else"} />
          <FlipText style={styles.commonBtnText} type="Regular">
            Something else
          </FlipText>
        </Pressable>
        <FlipText style={[styles.title, { color: colors.secondary, marginTop: 30 }]} type="Bold">
          Confirm Identity
        </FlipText>
        <FlipText type="Regular">To verify that is you please enter your current password</FlipText>
        <FlipTextInput
          isForm
          secondary
          iconName="lock"
          password
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={showPassword}
          onShowPassword={() => setShowPassword(!showPassword)}
        />
        <FlipText
          type="Regular"
          style={[styles.forgottenPasswordText, { color: colors.secondary }]}
          onPress={() => navigate("PasswordSetting")}
        >
          Forgotten your password?
        </FlipText>
      </View>
      <View
        style={[
          styles.subContainer,
          { marginTop: 20, borderTopWidth: 1, borderColor: colors.tertiary, paddingTop: 30 },
        ]}
      >
        {error && (
          <FlipText type="Regular" style={{ color: "red", marginBottom: 20 }}>
            Incorrect credentials
          </FlipText>
        )}
        <FlipButton disabled={!reason || !password} buttonText="SUBMIT" type="Submit" onPress={submit} />
      </View>
    </FlipContainer>
  );
}

export default CloseAccountSetting;

const styles = StyleSheet.create({
  subContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: { fontSize: normalize(18), marginBottom: 5 },
  selectionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  commonBtnText: {
    marginLeft: 10,
  },
  forgottenPasswordText: {
    marginTop: 10,
    textAlign: "left",
    fontSize: normalize(14),
    textDecorationLine: "underline",
  },
});
