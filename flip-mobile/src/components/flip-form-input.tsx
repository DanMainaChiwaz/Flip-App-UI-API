import { Controller } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import FlipTextInput, { FlipTextInputProps } from "./flip-text-input";

interface FlipFormInput extends FlipTextInputProps {
  control: any;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rules?: any;
  isSecureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  isForm?: boolean;
  iconName?: string;
  keyboardType?: any;
  error?: any;
  password?: boolean;
  secondary?: boolean;
  onShowPassword?(): void;
}

const FlipFormInput = (props: FlipFormInput) => {
  const { control, name, required = false, rules = {} } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required, ...rules }}
      render={({ field: { onChange, onBlur, value } }) => (
        <FlipTextInput onChangeText={onChange} onBlur={onBlur} value={value} {...props} />
      )}
    />
  );
};

export default FlipFormInput;
