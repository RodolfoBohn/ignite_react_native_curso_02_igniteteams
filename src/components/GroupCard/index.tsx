import { TouchableHighlightProps } from 'react-native'
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableHighlightProps {
  title: string
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title >
        {title}
      </Title>
    </Container>
  )
}