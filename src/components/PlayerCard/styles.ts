import styled from "styled-components/native"
import { MaterialIcons } from "@expo/vector-icons"

export const Container = styled.View`
  width: 100%;
  height: 56px;

  flex-direction: row;
  align-items: center;

  background-color: ${props => props.theme.COLORS.GRAY_500};
  border-radius: 6px;
`

export const Name = styled.Text`
  color: ${props => props.theme.COLORS.GRAY_200};
  font-family: ${props => props.theme.FONT_FAMILY.REGULAR};
  font-size: ${props => props.theme.FONT_SIZE.MD}px;

  flex: 1;
`

export const Icon = styled(MaterialIcons).attrs(props => ({
  size: 24,
  color: props.theme.COLORS.GRAY_200
}))`
  margin-left: 24px;
  margin-right: 4px;
`