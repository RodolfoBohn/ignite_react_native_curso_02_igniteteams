import { TouchableOpacityProps } from "react-native";
import { Container, Title, ButtonVariantStyleProps } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariantStyleProps
}

export function Button({title, variant = 'PRIMARY', ...rest}: Props){
  return (
    <Container variant={variant} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}