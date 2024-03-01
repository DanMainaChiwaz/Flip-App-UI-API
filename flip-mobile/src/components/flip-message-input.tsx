import { useContext, forwardRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Platform, StyleProp, ViewStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "utils/theme-context";
import { normalize } from "utils/helpers";

interface FlipMessageInputProps {
  style?: StyleProp<ViewStyle>;
  onSend(): any;
  placeholder?: string;
  value?: string;
  onChangeText: (value: string) => any;
  onSend(): any;
}

const FlipMessageInput = forwardRef((props: FlipMessageInputProps, ref: React.Ref<TextInput>) => {
  const { style, onSend, ...inputProps } = props;
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[style, styles.inputContainer]}>
      <TextInput ref={ref} style={styles.input} {...inputProps} />
      <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
        <FontAwesome5 name="telegram-plane" size={30} color={colors.foreground} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    alignSelf: "stretch",
    borderRadius: 10,
  },
  input: {
    alignSelf: "stretch",
    maxHeight: 125,
    height: 60,
    fontSize: normalize(16),
    borderRadius: 10,
    padding: 10,
    fontFamily: "Proxima-Nova-Regular",
    borderWidth: 1,
    borderColor: "#264656",
    backgroundColor: "#ffffff",
  },
  sendBtn: {
    position: "absolute",
    right: 20,
    top: 15,
  },
});

export default FlipMessageInput;
