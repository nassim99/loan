import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Text from 'components/app-text';
import { Column } from 'components/grid';
import Pressable from 'components/pressable';

import { BLACK, WHITE } from 'styles/colors';

const WINDOW_WIDTH = Dimensions.get('window').width;

type RootStackParamList = {
  LoanScreen: undefined;
};
interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Column style={styles.container}>
      <Pressable onPress={() => navigation.navigate('LoanScreen')} style={styles.pressable}>
        <Text color={WHITE} size={20} bold>
          Start
        </Text>
      </Pressable>
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    backgroundColor: BLACK,
    height: WINDOW_WIDTH / 2,
    width: WINDOW_WIDTH / 2,
    borderRadius: WINDOW_WIDTH / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
