import { TouchableOpacityProps } from 'react-native'

import { ButtonIconVariantStyleProps, Container, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  name: keyof typeof MaterialIcons.glyphMap
  variant?: ButtonIconVariantStyleProps
}

export function ButtonIcon({name, variant = "PRIMARY", ...rest}: Props) {
  return(
    <Container {...rest}>
      <Icon name={name} variant={variant} />
    </Container>
  );
}