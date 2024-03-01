import { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";

export interface FlipIconProps {
  name: string;
  size: number;
}

export interface FlipTextInputProps extends TextInputProps {
  iconName?: any;
  iconSize?: number;
  iconColor?: string;
  isForm?: boolean;
  password?: boolean;
  secureTextEntry?: boolean;
  secondary?: boolean;
  onShowPassword?(): void;
  error?: string;
  iconStyle?: any;
  iconOnEnd?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

// error colors
const errorColors = {
  background: "#FFD4D4",
  border: "red",
};

const FlipTextInput = (props: FlipTextInputProps) => {
  const {
    isForm,
    iconName,
    iconSize,
    password,
    secureTextEntry,
    onShowPassword,
    error,
    secondary,
    style,
    iconStyle,
    iconOnEnd,
    inputStyle,
    ...inputProps
  } = props;
  const { colors } = useContext(ThemeContext);

  const PasswordFeature = () => {
    if (password) {
      return (
        <TouchableOpacity onPress={onShowPassword} style={styles.showPasswordBtn}>
          {secureTextEntry ? (
            <FontAwesome5 name="eye" size={20} color="black" />
          ) : (
            <FontAwesome5 name="eye-slash" size={20} color="black" />
          )}
        </TouchableOpacity>
      );
    }
  };

  // TODO: Implement icons after getting icon files (temporary using FontAwesome)
  return iconName ? (
    <View
      style={[
        styles.inputContainer,
        {
          marginTop: isForm && 15,
          borderWidth: secondary ? 0 : 1,
          borderColor: error ? errorColors.border : "#264656",
          backgroundColor: error ? errorColors.background : secondary ? colors.tertiary : "#ffffff",
        },
        style,
      ]}
    >
      {!iconOnEnd && (
        <FontAwesome5
          style={[styles.icon, { ...iconStyle }]}
          name={iconName}
          size={normalize(18)}
          color={error ? "red" : colors.secondary}
        />
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.secondary,
            height: "100%",
            paddingLeft: !iconOnEnd ? 40 : 10,
          },
        ]}
        {...inputProps}
        autoCapitalize={inputProps.keyboardType === "email-address" ? "none" : "sentences"}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={error ? errorColors.border : "#264656"}
      />
      {iconOnEnd && (
        <FontAwesome5
          style={[styles.icon, { ...iconStyle, left: null, right: 8, top: 12 }]}
          name={iconName}
          size={normalize(18)}
          color={error ? "red" : colors.secondary}
        />
      )}
      {PasswordFeature()}
    </View>
  ) : (
    <View style={[styles.inputContainer, { marginTop: isForm && 15 }, style]}>
      <TextInput
        style={[
          styles.input,
          {
            borderWidth: secondary ? 0 : 1,
            borderColor: error ? errorColors.border : "#264656",
            backgroundColor: error ? errorColors.background : secondary ? colors.tertiary : "#ffffff",
          },
          inputStyle,
        ]}
        autoCapitalize={inputProps.keyboardType === "email-address" ? "none" : "sentences"}
        secureTextEntry={secureTextEntry}
        {...inputProps}
        placeholderTextColor={error ? errorColors.border : "#264656"}
      />
      {PasswordFeature()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    height: 60,
    alignSelf: "stretch",
    borderRadius: 10,
  },
  input: {
    alignSelf: "stretch",
    maxHeight: 125,
    height: "100%",
    fontSize: normalize(15),
    borderRadius: 10,
    padding: 10,
    fontFamily: "Proxima-Nova-Regular",
  },
  showPasswordBtn: {
    right: 20,
    position: "absolute",
    top: "35%",
    elevation: 3,
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    elevation: 3,
    top: 20,
    left: 15,
  },
});

export default FlipTextInput;
