import React from 'react';
import { StyleSheet } from 'react-native';

import { Column } from 'components/grid';
import { LightBlue, LightGray } from 'styles/colors';

interface SeparatorProps {
  type?: 'full' | 'text';
}
const Separator: React.FC<SeparatorProps> = ({ type = 'text' }) => {
  const style = type === 'full' ? styles.full : styles.container;
  return <Column style={style} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 3,
    width: '30%',
    backgroundColor: LightBlue,
  },
  full: {
    height: 2,
    width: '100%',
    backgroundColor: LightGray,
    marginVertical: 20,
  },
});

export default Separator;
