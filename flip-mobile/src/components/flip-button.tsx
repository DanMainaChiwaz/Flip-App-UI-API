import { StyleSheet, TouchableOpacityProps, Pressable } from "react-native";
import FlipText from "./flip-text";
import { normalize } from "utils/helpers";

interface FlipButtonProps extends TouchableOpacityProps {
  buttonText: string;
  type?: "Submit" | "Interactive";
  fontSize?: number;
  color?: string;
  style?: any;
}

const FlipButton = (props: FlipButtonProps) => {
  const { style, buttonText, type, fontSize, disabled, color, ...opacityProps } = props;

  let backgroundColor;
  switch (type) {
    case "Submit":
      backgroundColor = "#2A9D8F";
      break;
    case "Interactive":
      backgroundColor = "#264653";
      break;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor,
          opacity: disabled ? 0.5 : pressed ? 0.2 : 1,
          borderColor: "white",
          borderWidth: type === "Interactive" ? 1 : 0,
        },
        style,
      ]}
      disabled={disabled}
      {...opacityProps}
    >
      <FlipText
        type="Regular"
        style={[styles.text, { fontSize: fontSize || normalize(12), color: color || "#EAF0F2" }]}
      >
        {buttonText}
      </FlipText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 60,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    maxHeight: 65,
  },
  text: {
    color: "#EAF0F2",
    textAlign: "center",
  },
});

export default FlipButton;
