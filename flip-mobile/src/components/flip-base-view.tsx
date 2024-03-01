import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "utils/theme-context";

const FlipBaseView = ({ children, style, ...props }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[style, { backgroundColor: colors.background }]} {...props}>
      {children}
    </View>
  );
};

export default FlipBaseView;
