import React from 'react';
import { Image } from 'react-native';

export const PiLogo = props => {
  return (
    <Image
      source={require('../assets/images/Raspberry.png')}
      style={{ resizeMode: 'contain' }}
    />
  );
};
