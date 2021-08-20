import React from 'react';
import {
  Text as OriginalText,
  StyleSheet,
  TextStyle,
  TextProps,
  ColorValue,
  StyleProp,
} from 'react-native';

import { BLACK } from 'styles/colors';

export interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: ColorValue;
  bold?: boolean;
  children?: string | number | null;
}

export default function Text({
  style,
  size = 14,
  color = BLACK,
  bold = false,
  children,
  ...props
}: AppTextProps) {
  const styles: any = {
    baseStyle: {
      fontSize: size,
    },
  };

  const combineTextStyle = StyleSheet.flatten([
    styles.baseStyle,
    bold && { fontWeight: 'bold' },
    { color },
    style,
  ]);
  return (
    <OriginalText testID={'text'} allowFontScaling={false} {...props} style={combineTextStyle}>
      {children}
    </OriginalText>
  );
}
