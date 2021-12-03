import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import R from '_src/assets/R';
import style from './Splash.style';

export type SplashProps = {};

const Splash: React.FC<SplashProps> = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator color={R.colors.PRIMARY} size={100} />
    </View>
  );
};

export default Splash;
