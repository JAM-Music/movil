import {NavigationProp} from '@react-navigation/core';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ButtonGroup, Text, Image, Icon} from 'react-native-elements';
import Content from '_src/components/Content';
import {Song} from '_src/utils/types/Songs';
import SeekBar from '_src/components/SeekBar';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {useSongs} from '_src/hooks/useSong';
import style from './MusicPlayer.style';
import R from '_src/assets/R';

export type MusicPlayerProps = {};

const MusicPlayer: React.FC<MusicPlayerProps> = ({}) => {
  const playback = usePlaybackState();
  const progress = useProgress();
  const [trackObj, setTrackObj] = useState<Track>();

  async function getTrack() {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    setTrackObj(trackObject);
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], () => {
    getTrack();
  });
  const [music, setMusic] = useState([]);
  const {assingSongs} = useSongs();
  const [iconButton, setIconButton] = useState('pause');

  useEffect(() => {
    getTrack();
  }, []);

  async function back() {
    TrackPlayer.skipToPrevious();
  }

  async function forward() {
    TrackPlayer.skipToNext();
  }

  async function controlMusic() {
    if (playback == State.Playing) {
      TrackPlayer.pause();
      setIconButton('play-arrow');
    } else if (playback == State.Paused) {
      TrackPlayer.play();
      setIconButton('pause');
    }
  }

  if (!trackObj) return null;
  return (
    <Content>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={{uri: (trackObj?.artwork as string) || ''}}
          style={{width: '80%', aspectRatio: 1, borderRadius: 10}}
          blurRadius={0.9}
        />
        <Text style={{marginTop: 20, fontSize: 20}}>{trackObj?.title}</Text>
        <Text style={{marginTop: 10, fontSize: 15}}>
          {trackObj?.album + ' - ' + trackObj?.artist}
        </Text>
        <View style={{marginTop: 20}}>
          <SeekBar
            duration={trackObj?.duration || 10}
            currentTime={progress.position || 1}
            onSeek={position => TrackPlayer.seekTo(position)}
          />
        </View>
        <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>
          <Icon
            name={'skip-previous'}
            type="material"
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => back()}
          />
          <Icon
            name={iconButton}
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => controlMusic()}
          />
          <Icon
            name={'skip-next'}
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => forward()}
          />
        </View>
      </View>
    </Content>
  );
};

export default MusicPlayer;
