import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import Template from './PlayerOverlay.template';
import style from './PlayerOverlay.style';
import {
  NavigationProp,
  useNavigationState,
  useNavigation,
} from '@react-navigation/core';
import {RootScreens} from '_src/utils/types/Screens';
import TrackPlayer, {
  Track,
  State,
  useTrackPlayerEvents,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import PushNotification from 'react-native-push-notification';
import R from '_src/assets/R';
export type PlayerOverlayProps = {};

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({children}) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [trackObj, setTrackObj] = useState<Track>();
  const state = useNavigationState(s => s);
  const playback = usePlaybackState();
  const navigation = useNavigation<NavigationProp<RootScreens>>();

  const isBottomTabOpen = useMemo(
    () => state?.routes[state?.index].name === 'dashboard',
    [state],
  );

  const isInPlayer = useMemo(
    () => state?.routes[state?.index].name === 'musicPlayer' || false,
    [state],
  );

  useEffect(() => {
    const didShowSub = Keyboard.addListener('keyboardDidShow', () => {
      setShowOverlay(false);
    });
    const didHideSub = Keyboard.addListener('keyboardDidHide', () => {
      setShowOverlay(true);
    });
    return () => {
      didShowSub.remove();
      didHideSub.remove();
    };
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (
      event.type === 'playback-track-changed' &&
      event.nextTrack !== undefined
    ) {
      TrackPlayer.getTrack(event.nextTrack).then(setTrackObj);
    }
  });

  useEffect(() => {
    if (trackObj) {
      PushNotification.localNotification({
        channelId: 'channel-id',
        message: `${trackObj.album} - ${trackObj.artist}`,
        ignoreInForeground: true,
        title: `Ahora reproduciendo: ${trackObj.title}`,
        color: R.colors.BG,
        largeIconUrl: trackObj.artwork as string,
      });
    }
    return () => {
      if (PushNotification.cancelAllLocalNotifications) {
        PushNotification.cancelAllLocalNotifications();
      }
    };
  }, [trackObj]);

  const togglePlay = useCallback(() => {
    if (playback === State.Paused) {
      TrackPlayer.play();
      return;
    }
    TrackPlayer.pause();
  }, [playback]);

  return (
    <View style={style.index}>
      {children}
      {trackObj && (
        <Template
          togglePlayPause={togglePlay}
          paused={playback === State.Paused}
          show={showOverlay && !isInPlayer}
          isBottomTabOpen={isBottomTabOpen}
          trackObj={trackObj}
          onPress={() => {
            navigation.navigate('musicPlayer');
          }}
        />
      )}
    </View>
  );
};

export default PlayerOverlay;
