import { View, StyleProp, ViewStyle } from "react-native";
import { normalize } from "utils/helpers";

interface RadioButtonProps {
  style?: StyleProp<ViewStyle>;
  radioColor: string;
  selected: boolean;
}

const FlipRadioButton = (props: RadioButtonProps) => {
  return (
    <View
      style={[
        {
          height: normalize(20),
          width: normalize(20),
          borderRadius: 12,
          borderWidth: 2,
          borderColor: props.radioColor || "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      {props.selected ? (
        <View
          style={{
            height: normalize(10),
            width: normalize(10),
            borderRadius: 6,
            backgroundColor: props.radioColor || "#000",
          }}
        />
      ) : null}
    </View>
  );
};

export default FlipRadioButton;
