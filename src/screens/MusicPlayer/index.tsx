import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text, Image, Icon} from 'react-native-elements';
import Content from '_src/components/Content';
import SeekBar from '_src/components/SeekBar';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import style from './MusicPlayer.style';
import R from '_src/assets/R';
import QueueModal from '_src/components/QueueModal';

export type MusicPlayerProps = {};

const MusicPlayer: React.FC<MusicPlayerProps> = ({}) => {
  const playback = usePlaybackState();
  const progress = useProgress();
  const [trackObj, setTrackObj] = useState<Track>();
  const [queue, setQueue] = useState(false);
  const icon = useMemo(() => {
    if (playback === State.Buffering) return 'loading';
    return playback === State.Paused ? 'play-arrow' : 'pause';
  }, [playback]);
  async function getTrack() {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    setTrackObj(trackObject);
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], () => {
    getTrack();
  });

  useEffect(() => {
    getTrack();
  }, []);

  async function back() {
    TrackPlayer.skipToPrevious().catch(console.log);
  }

  async function forward() {
    TrackPlayer.skipToNext().catch(console.log);
  }

  async function controlMusic() {
    if (playback === State.Playing) {
      TrackPlayer.pause();
    } else if (playback === State.Paused) {
      TrackPlayer.play();
    }
  }

  if (!trackObj) return null;
  return (
    <Content>
      <View style={style.main}>
        <Image
          source={{uri: (trackObj?.artwork as string) || ''}}
          style={style.image}
          blurRadius={0.6}
        />
        <Text style={style.title}>{trackObj?.title}</Text>
        <Text style={style.album}>
          {trackObj?.album + ' - ' + trackObj?.artist}
        </Text>
        <View style={style.seekBar}>
          <SeekBar
            duration={trackObj?.duration || 10}
            currentTime={progress.position || 1}
            onSeek={position => TrackPlayer.seekTo(position)}
          />
        </View>
        <View style={style.controls}>
          <Icon
            name={'skip-previous'}
            type="material"
            tvParallaxProperties
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            size={40}
            onPress={() => back()}
          />
          {icon === 'loading' ? (
            <ActivityIndicator
              color={R.colors.PRIMARY}
              style={style.playIcon}
              size={100}
            />
          ) : (
            <Icon
              name={icon}
              tvParallaxProperties
              reverse
              containerStyle={style.playIcon}
              color={R.colors.PRIMARY}
              onPress={() => controlMusic()}
              size={40}
            />
          )}
          <Icon
            name={'skip-next'}
            size={40}
            tvParallaxProperties
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => forward()}
          />
        </View>
        <View style={style.queueWrapper}>
          <QueueModal visible={queue} onClose={() => setQueue(false)} />
          <Icon
            name={'queue-music'}
            size={35}
            tvParallaxProperties
            containerStyle={style.playIcon}
            color={R.colors.TEXT}
            onPress={() => setQueue(true)}
          />
        </View>
      </View>
    </Content>
  );
};

export default MusicPlayer;
