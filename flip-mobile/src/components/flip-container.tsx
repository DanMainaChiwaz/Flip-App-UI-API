import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

function FlipContainer({ children, style }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

export default FlipContainer;
