import {Container, Message} from './styles'

interface Props {
  message: string
}

export function EmptyList({ message }: Props) {
  return (
    <Container>
      <Message>
        {message}
      </Message>
    </Container>
  )
}