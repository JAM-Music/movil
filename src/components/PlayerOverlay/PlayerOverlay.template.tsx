import React, {useMemo} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import R from '_src/assets/R';
import {backendURL} from '_src/config/backend';
import style from './PlayerOverlay.style';
import {RootScreens} from '_src/utils/types/Screens';
import {NavigationProp} from '@react-navigation/core';
import {Song} from '_src/utils/types/Songs';

export type PlayerOverlayTemplateProps = {
  show: boolean;
  isBottomTabOpen: boolean;
};

const Template: React.FC<PlayerOverlayTemplateProps> = ({
  show,
  isBottomTabOpen,
}) => {
  const containerStyle = useMemo(
    () =>
      ({
        display: show ? 'flex' : 'none',
        bottom: isBottomTabOpen ? 80 : 10,
      } as ViewStyle),
    [show, isBottomTabOpen],
  );

  return (
    <View style={[style.container, containerStyle]}>
      <Pressable onPress={() => {}} style={style.main}>
        <Image
          source={{uri: `${backendURL}/images/albums/planet her.jpg`}}
          style={style.image}
        />
        <View>
          <Text>PlayerOverlay</Text>
          <Text style={style.author}>Autor</Text>
        </View>
        <View style={style.playWrapper}>
          <Icon
            name="play-arrow"
            tvParallaxProperties
            color={R.colors.TEXT}
            onPress={() => console.log('@@@ play/pause song')}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Template;
