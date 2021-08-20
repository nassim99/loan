import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import Text from 'components/app-text';
import { Column } from 'components/grid';
import Separator from 'components/separator';

import { LightGray } from 'styles/colors';

const WINDOW_WIDTH = Dimensions.get('window').width;

interface HeaderItemProps {
  value: string;
  title: string;
  centerBorder?: boolean;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ title, value, centerBorder = false }) => {
  const style = StyleSheet.flatten([styles.container, centerBorder && styles.itemCenter]);
  return (
    <Column style={style}>
      <Text>{value}</Text>
      <Separator />
      <Text>{title}</Text>
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH / 3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemCenter: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: LightGray,
    borderLeftColor: LightGray,
  },
});

export default HeaderItem;
