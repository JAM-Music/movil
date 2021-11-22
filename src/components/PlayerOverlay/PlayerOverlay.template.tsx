import React, {useMemo} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import R from '_src/assets/R';
import {backendURL} from '_src/config/backend';
import style from './PlayerOverlay.style';
import {RootScreens} from '_src/utils/types/Screens';
import {NavigationProp} from '@react-navigation/core';
import {Song} from '_src/utils/types/Songs';
import TrackPlayer, {Track} from 'react-native-track-player';

export type PlayerOverlayTemplateProps = {
  show: boolean;
  isBottomTabOpen: boolean;
  trackObj: Track;
  paused: boolean;
  togglePlayPause: () => any;
  onPress: () => any;
};

const Template: React.FC<PlayerOverlayTemplateProps> = ({
  show,
  isBottomTabOpen,
  trackObj,
  onPress,
  togglePlayPause,
  paused,
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
      <Pressable onPress={() => onPress()} style={style.main}>
        <Image
          source={{uri: (trackObj?.artwork as string) || ''}}
          style={style.image}
        />
        <View>
          <Text>{trackObj?.title || ''}</Text>
          <Text style={style.author}>{trackObj?.album || ''}</Text>
        </View>
        <View style={style.playWrapper}>
          <Icon
            name={paused ? 'play-arrow' : 'pause'}
            tvParallaxProperties
            color={R.colors.TEXT}
            onPress={togglePlayPause}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Template;
