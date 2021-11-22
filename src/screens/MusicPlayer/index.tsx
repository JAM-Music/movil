import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ButtonGroup, Text, Image, Icon} from 'react-native-elements';
import Content from '_src/components/Content';
import {Song} from '_src/utils/types/Songs';
import SeekBar from '_src/components/SeekBar';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useSongs} from '_src/hooks/useSong';
import {backendURL} from '_src/config/backend';
import {getSession} from '_services/RESTMethods';
import style from './MusicPlayer.style';
import R from '_src/assets/R';

backendURL;

export type MusicPlayerProps = {
  route: {params: {song: Song}};
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({route}) => {
  const {params} = route;
  const {song} = params;

  const playback = usePlaybackState();
  const progress = useProgress();
  const [player, setPlayer] = useState({});
  const [music, setMusic] = useState([]);
  const {getSong} = useSongs();
  const [iconButton, setIconButton] = useState('pause');

  useEffect(() => {
    async function getCredentials() {
      const sessionId = await getSession();
      const Authorization = `Bearer ${sessionId}`;
      TrackPlayer.add([
        {
          url: `${backendURL}/songs/play/${song._id}`, // Load media from the network
          title: song.title,
          artist: song.album.author.name,
          album: song.album.title,
          genre: song.genre.name,
          duration: song.duration, // Duration in seconds
          headers: {
            Authorization,
          },
        },
      ]).then(async () => {
        await TrackPlayer.play();
        console.log('postSong');
      });
    }
    getCredentials();
  }, [song]);

  async function controlMusic() {
    if (playback == State.Playing) {
      TrackPlayer.pause();
      setIconButton('play-arrow');
    } else if (playback == State.Paused) {
      TrackPlayer.play();
      setIconButton('pause');
    }
  }

  return (
    <Content>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={{uri: song.album.image}}
          style={{width: '80%', aspectRatio: 1, borderRadius: 10}}
          blurRadius={0.9}
        />
        <Text style={{marginTop: 20, fontSize: 20}}>{song.title}</Text>
        <Text style={{marginTop: 10, fontSize: 15}}>
          {song.album.title + ' - ' + song.album.author.name}
        </Text>
        <View style={{marginTop: 20}}>
          <SeekBar
            duration={song.duration}
            currentTime={progress.position}
            onSeek={position => TrackPlayer.seekTo(position)}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Icon
            name={iconButton}
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => controlMusic()}
          />
        </View>
      </View>
    </Content>
  );
};

export default MusicPlayer;
