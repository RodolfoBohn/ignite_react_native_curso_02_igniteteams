import { useNavigation } from "@react-navigation/native"
import { BackButton, BackIcon, Container, Logo } from "./styles"

import logoImg from '@assets/logo.png'

interface Props {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigator = useNavigation()

  function handleGoBack() {
    //Volta sempre para a tela anterior
    //Como o comportamento esperado é voltar sempre para groups, vamos deixar explícito isso com o navigate
    //navigator.goBack()

    navigator.navigate('groups')
  }

  return (
    <Container>
      {
        showBackButton && (
          <BackButton onPress={handleGoBack}>
            <BackIcon />
          </BackButton>
        )
      }
      
      <Logo source={logoImg} />
    </Container>
  )
}