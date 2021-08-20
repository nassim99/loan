import * as React from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Platform,
  Pressable as originalPressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';

export interface PlatformPressableProps extends Omit<PressableProps, 'style'> {
  pressColor?: string;
  pressOpacity?: number;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  isRipple?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(originalPressable);

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_SUPPORTS_RIPPLE =
  Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

/**
 * PlatformPressable provides an abstraction on top of Pressable to handle platform differences.
 */
export default function Pressable({
  onPressIn,
  onPressOut,
  android_ripple,
  pressColor,
  pressOpacity = 0.3,
  containerStyle,
  style,
  isRipple = true,
  children,
  ...rest
}: PlatformPressableProps) {
  const [opacity] = React.useState(() => new Animated.Value(1));

  const rippleConfig = ANDROID_SUPPORTS_RIPPLE && isRipple ? android_ripple : undefined;

  const animateTo = (toValue: number, duration: number) => {
    if (ANDROID_SUPPORTS_RIPPLE) {
      return;
    }

    Animated.timing(opacity, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = (e: GestureResponderEvent) => {
    animateTo(pressOpacity, 0);
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    animateTo(1, 200);
    onPressOut?.(e);
  };

  const combineContainerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    { overflow: 'hidden' },
    containerStyle,
  ]);
  const combineStyle = StyleSheet.flatten([
    { opacity: !ANDROID_SUPPORTS_RIPPLE ? opacity : 1 },
    style,
  ]);

  return (
    <View style={combineContainerStyle}>
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={rippleConfig}
        style={[combineStyle]}
        {...rest}>
        {children}
      </AnimatedPressable>
    </View>
  );
}
