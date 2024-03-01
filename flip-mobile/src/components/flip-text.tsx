import { Text, TextProps, StyleProp, ViewStyle } from "react-native";

interface FlipTextProps extends TextProps {
  type: "Regular" | "Bold" | "Extrabold" | "Thin";
  children: any;
}

const FlipText = ({ style, type, ...props }: FlipTextProps) => {
  return (
    <Text style={[style, { fontFamily: `Proxima-Nova-${type}` }]} {...props}>
      {props.children}
    </Text>
  );
};

export default FlipText;
