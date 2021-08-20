import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { BLACK } from 'styles/colors';

const Loading: React.FC<ActivityIndicatorProps> = props => {
  return <ActivityIndicator size="large" color={BLACK} {...props} />;
};

export default Loading;
