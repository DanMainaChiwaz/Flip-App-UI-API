import React, { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { FlipButton, FlipText } from "components";
import { normalize } from "utils/helpers";
import { ThemeContext } from "utils/theme-context";

function DeleteAccount({ navigation: { goBack } }) {
  const { colors } = useContext(ThemeContext);

  const deleteAccount = () => {
    // TODO: delete user account
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../../../assets/icons/filler.png")} />
      <FlipText style={{ fontSize: normalize(22), color: colors.foreground, marginBottom: 10 }} type="Extrabold">
        We're sad to see you leaving FLIP
      </FlipText>
      <FlipText style={{ color: colors.secondary, marginBottom: 10 }} type="Bold">
        Are you sure you want to delete your account?
      </FlipText>
      <FlipText style={{ textAlign: "center", color: colors.secondary, marginBottom: 10 }} type="Regular">
        This action can't be undone once you press delete, all your data will be erased from our system.
      </FlipText>
      <View style={styles.buttonsContainer}>
        <FlipButton onPress={() => goBack()} style={styles.button} type="Submit" buttonText="CANCEL" />
        <FlipButton
          color={colors.foreground}
          style={[styles.button, { backgroundColor: colors.background, borderColor: colors.foreground }]}
          type="Interactive"
          buttonText="DELETE"
          onPress={deleteAccount}
        />
      </View>
    </View>
  );
}

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  image: {
    marginTop: 80,
    marginBottom: 80,
    width: 120,
    height: 120,
    borderRadius: 90,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    width: "100%",
    justifyContent: "space-evenly",
  },
  button: {
    width: "45%",
  },
});
