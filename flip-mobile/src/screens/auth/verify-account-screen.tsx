import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { AppDispatch } from "store";
import { ThemeContext } from "utils/theme-context";
import { FlipButton, FlipText, FlipContainer } from "components";
import { normalize } from "src/utils/helpers";

const VerifyCodeNav = ({ onResendCode, onVerifyCode }) => {
  const CODE_LENGTH = 6;
  const CELL_SIZE = 50;

  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useContext(ThemeContext);

  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CODE_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const resendCode = () => {
    dispatch(onResendCode());
  };

  const verifyCode = () => {
    if (code) {
      dispatch(onVerifyCode(code));
    }
  };

  return (
    <FlipContainer style={styles.container}>
      <View style={styles.titleContainer}>
        <FlipText type="Extrabold" style={[styles.title, { color: colors.interactive }]}>
          Verification
        </FlipText>
        <FlipText type="Regular" style={[styles.headline, { color: colors.secondary }]}>
          Please enter a 6-digit validation code sent to your email or phone number
        </FlipText>
      </View>
      <CodeField
        ref={ref}
        {...props}
        autoFocus
        selectionColor={colors.tertiary}
        value={code}
        onChangeText={setCode}
        cellCount={CODE_LENGTH}
        keyboardType="numeric"
        rootStyle={styles.cellsContainer}
        renderCell={({ index, symbol, isFocused }) => (
          <FlipText
            type="Regular"
            key={index}
            style={[
              styles.cell,
              {
                backgroundColor: colors.tertiary,
                color: colors.secondary,
                width: CELL_SIZE,
                height: CELL_SIZE,
                lineHeight: CELL_SIZE - 5,
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused && <Cursor />)}
          </FlipText>
        )}
      />
      <View style={styles.bottomContainer}>
        <FlipText type="Regular" style={[styles.bottomText, { color: colors.secondary }]}>
          Didn't get code?
        </FlipText>
        <FlipText type="Bold" style={[styles.bottomLink, { color: colors.interactive }]} onPress={resendCode}>
          Resend code
        </FlipText>
      </View>
      <FlipButton
        onPress={verifyCode}
        type="Submit"
        buttonText="SUBMIT"
        fontSize={16}
        style={styles.submitButton}
        disabled={code.length < 6}
      />
    </FlipContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 30,
  },
  headline: {
    fontSize: normalize(15),
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  cellsContainer: {
    marginTop: 100,
    paddingHorizontal: 10,
  },
  cell: {
    marginHorizontal: 5,
    fontWeight: "bold",
    fontSize: 30,
    borderRadius: 10,
    textAlign: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  bottomText: {
    fontSize: normalize(15),
    textAlign: "center",
    marginRight: 5,
  },
  bottomLink: {
    fontSize: normalize(15),
    textDecorationLine: "underline",
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 50,
  },
});

export default VerifyCodeNav;
