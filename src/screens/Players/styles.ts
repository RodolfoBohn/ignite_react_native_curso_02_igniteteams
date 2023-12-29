import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context'


export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Form = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

`

export const HeaderList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 32px 0 12px;
`

export const TeamMembersCounter = styled.Text`
  color: ${props => props.theme.COLORS.GRAY_200};
  font-family: ${props => props.theme.FONT_FAMILY.BOLD};
  font-size: ${props => props.theme.FONT_SIZE.SM}px;
`