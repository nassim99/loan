import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import HomeScreen from 'screens/home';
import LoanScreen from 'screens/loan-screen';
import AccountRepaiementsScreen from 'screens/account-repaiement';

import Lang from 'local/lang';
import { BLACK, LightBlue, LightGray } from 'styles/colors';

import Text from 'components/app-text';
import { Alert } from 'react-native';

const Root = createStackNavigator();

export const screensOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerStyle: { backgroundColor: LightGray, elevation: 0, borderBottomWidth: 1 },
  headerTitleAlign: 'center',
};

export default function AppStack() {
  return (
    <Root.Navigator screenOptions={screensOptions}>
      <Root.Screen
        options={{
          title: Lang.home,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Root.Screen
        options={{
          title: '',
          headerTintColor: LightBlue,
          headerTitleStyle: { color: BLACK },

          headerRight: () => (
            <Text color={LightBlue} size={16} onPress={() => Alert.alert('Summary')}>
              {Lang.summary}
            </Text>
          ),

          headerRightContainerStyle: {
            paddingRight: 30,
          },
        }}
        name="LoanScreen"
        component={LoanScreen}
      />
      <Root.Screen
        options={{
          title: Lang.accountRepaiements,
          headerTintColor: LightBlue,
        }}
        name="AccountRepaiement"
        component={AccountRepaiementsScreen}
      />
    </Root.Navigator>
  );
}
