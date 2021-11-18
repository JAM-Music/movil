import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import {Screens} from '_src/utils/types/Screens';
import style from './Header.style';

export type HeaderProps = {
  navigation: NavigationProp<Screens>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: R.colors.BG,
        // alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '33%', alignItems: 'flex-start'}}>
          <Icon
            name="arrow-back"
            tvParallaxProperties
            color={R.colors.BORDER}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* <View style={{width: '33%', alignItems: 'center'}}>
          <Text>Artista</Text>
        </View> */}
        <View />
      </View>
    </View>
  );
};

export default Header;
