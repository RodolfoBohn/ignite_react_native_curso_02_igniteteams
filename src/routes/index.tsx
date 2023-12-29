import { View } from 'react-native'
import { useTheme } from 'styled-components/native'
import {NavigationContainer} from '@react-navigation/native'

import { AppRoute } from './app.Routes'

export function Route() {
  const {COLORS} = useTheme()

  return (
    <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
    </View>
  )
}