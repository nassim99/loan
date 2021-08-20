import React from 'react';
import { StyleSheet } from 'react-native';

import { Column } from 'components/grid';
import { BLACK, LightBlue } from 'styles/colors';

interface BulletProps {
  selected?: boolean;
}

const Bullet: React.FC<BulletProps> = ({ selected = false }) => {
  const style = StyleSheet.flatten([
    styles.container,
    { backgroundColor: selected ? LightBlue : BLACK },
  ]);

  return <Column style={style} />;
};

const styles = StyleSheet.create({
  container: { width: 15, height: 15, borderRadius: 15 / 2, marginHorizontal: 5 },
});

export default Bullet;
