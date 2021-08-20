import React from 'react';
import {
  ScrollView as OriginScrollView,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ScrollViewProps,
} from 'react-native';
import { ScrollView as ScrollViewGestureHandler } from 'react-native-gesture-handler';
import { Column } from 'components/grid';

interface ScrollViewInterface extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
  rest?: ScrollViewProps;
  isScreen?: boolean;
  horizontal?: boolean;
  refs?: any;
  fromGestureHandler?: boolean;
}

const ScrollView: React.FC<ScrollViewInterface> = React.forwardRef(
  (
    {
      children,
      style = {},
      horizontal = false,
      isScreen = false,
      refs,
      fromGestureHandler,
      ...rest
    },
    ref: any,
  ) => {
    const mergedStyle = StyleSheet.flatten([
      styles.container,
      isScreen && styles.horizontalPadding,
      horizontal && styles.directionRow,
      style,
    ]);

    const ScrollViewComponent = fromGestureHandler ? ScrollViewGestureHandler : OriginScrollView;

    return (
      <ScrollViewComponent
        ref={refs}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...rest}
        style={mergedStyle}
        horizontal={horizontal}>
        {children}
        {isScreen && (
          <Column
            style={{
              height: 80,
            }}
          />
        )}
      </ScrollViewComponent>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  directionRow: {
    flexDirection: 'row',
  },
  horizontalPadding: {
    paddingHorizontal: 25,
  },
});

export default ScrollView;
