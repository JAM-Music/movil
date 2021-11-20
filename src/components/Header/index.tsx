import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import R from '_src/assets/R';
import {RootScreens} from '_src/utils/types/Screens';
import style from './Header.style';

export type HeaderProps = {
  navigation: NavigationProp<RootScreens>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  return (
    <View style={style.container}>
      <View style={style.main}>
        <View style={style.iconWrapper}>
          <Icon
            name="arrow-back"
            tvParallaxProperties
            color={R.colors.BORDER}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View />
      </View>
    </View>
  );
};

export default Header;
