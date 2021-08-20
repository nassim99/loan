import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { WHITE } from 'styles/colors'
import AppStack from './app-navigator'

const MainApp: React.FC = () => {
    return (
            <SafeAreaProvider
      style={{
        backgroundColor: WHITE,
      }}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>

    </SafeAreaProvider>
    )
}

export default MainApp