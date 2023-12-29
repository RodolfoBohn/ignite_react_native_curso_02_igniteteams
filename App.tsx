import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import theme from '@theme/index'
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { Route } from '@routes/index'

export default function App() {
  const [ isFontLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold})

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor="transparent"
      />
      {isFontLoaded ? <Route/>: <Loading />} 
    </ThemeProvider>
  );
}

