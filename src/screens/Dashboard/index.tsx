import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Pressable, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Content from '_src/components/Content';
import NoPlaylist from '_src/components/NoPlaylist';
import Thumbnail from '_src/components/Thumbnail';
import TrackRow from '_src/components/TrackRow';
import {usePlaylists, useRecents, useUser} from '_src/hooks';
import {useSongs} from '_src/hooks/useSong';
import {RootScreens} from '_src/utils/types/Screens';
import style from './Dashboard.style';

export type DashboardProps = {
  navigation: NavigationProp<RootScreens>;
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const {fullName} = useUser();
  const {playlists} = usePlaylists();
  const {recents, noRecents} = useRecents();
  const {assingSongs} = useSongs();

  return (
    <Content>
      <View style={style.topBar}>
        <Pressable
          style={style.person}
          onPress={() => navigation.navigate('profile')}>
          <Icon
            tvParallaxProperties
            name="person"
            type="material"
            reverse
            color={R.colors.SECONDARY}
          />
          <Text style={style.fullName}>{fullName}</Text>
        </Pressable>
        <Icon
          tvParallaxProperties
          name="search"
          type="material"
          reverse
          onPress={() => navigation.navigate('search')}
        />
      </View>

      <Text h3 style={style.recientes}>
        Recientes
      </Text>
      {noRecents && (
        <Text style={style.noRecents}>
          Las últimas canciones que escuches apareceran aquí 🎉
        </Text>
      )}
      {recents.map((song, index) => (
        <TrackRow
          key={song._id}
          song={song}
          onPress={() => {
            assingSongs(recents?.slice(index) || []);
            navigation.navigate('musicPlayer', {
              song,
            });
          }}
        />
      ))}
      <Text h3 style={style.playlist}>
        Playlists
      </Text>
      {!playlists.length && <NoPlaylist />}
      <View style={style.playlistContainer}>
        {playlists.slice(0, 10).map(playlist => (
          <Thumbnail
            key={playlist._id}
            style={style.thumbnail}
            image={{
              uri: playlist.image,
            }}
            title={playlist.title}
            onPress={() => navigation.navigate('playlistDetail', {playlist})}
          />
        ))}
      </View>
    </Content>
  );
};

export default Dashboard;
