import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};
  flex: 1;
`

export const Loader = styled.ActivityIndicator.attrs( props => ({
  color: props.theme.COLORS.GREEN_700,
}))``