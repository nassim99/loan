import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, StyleProp } from 'react-native';
import Pressable, { PlatformPressableProps } from 'components/pressable';

interface ColumnProps extends Omit<PlatformPressableProps, 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  rest?: ViewProps;
  isScreen?: boolean;
  margin?: boolean;
}

const Column: React.FC<ColumnProps> = ({
  style = {},
  margin,
  onPress,
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

export default Column;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  horizontalPadding: {
    paddingHorizontal: 25,
  },
  horizontalMargin: {
    marginHorizontal: 25,
  },
});
