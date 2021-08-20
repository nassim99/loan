import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, StyleProp } from 'react-native';
import Pressable, { PlatformPressableProps } from 'components/pressable';

interface RowProps extends Omit<PlatformPressableProps, 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  rest?: ViewProps;
  isScreen?: boolean;
  margin?: boolean;
}

const Row: React.FC<RowProps> = ({
  style = {},
  onPress,
  margin = false,
  isScreen = false,
  ...rest
}) => {
  const mergedStyle = StyleSheet.flatten([
    styles.container,
    isScreen && (margin ? styles.horizontalMargin : styles.horizontalPadding),
    style,
  ]);

  const SelectedView = !!onPress ? Pressable : View;
  return (
    <SelectedView {...rest} style={mergedStyle} onPress={onPress}>
      {rest.children}
    </SelectedView>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalPadding: {
    paddingHorizontal: 25,
  },
  horizontalMargin: {
    marginHorizontal: 25,
  },
});
