import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";

interface Props extends TextInputProps {
  inputRef?: React.RefObject<TextInput>
}

export function Input({inputRef, ...rest}:Props) {
  return (
    <Container ref={inputRef} {...rest} />
  )
}