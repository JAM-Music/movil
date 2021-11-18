import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Content from '_src/components/Content';
import NoPlaylist from '_src/components/NoPlaylist';
import Thumbnail from '_src/components/Thumbnail';
import TrackRow from '_src/components/TrackRow';
import {usePlaylists, useUser} from '_src/hooks';
import {RootScreens} from '_src/utils/types/Screens';
import style from './Dashboard.style';

export type DashboardProps = {
  navigation: NavigationProp<RootScreens>;
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const {fullName} = useUser();
  const {playlists} = usePlaylists();

  return (
    <Content>
      <View style={style.topBar}>
        <View style={style.person}>
          <Icon
            tvParallaxProperties
            name="person"
            type="material"
            reverse
            color={R.colors.SECONDARY}
          />
          <Text style={style.fullName}>{fullName}</Text>
        </View>
        <Icon tvParallaxProperties name="search" type="material" reverse />
      </View>
      <Text h3 style={style.recientes}>
        Recientes
      </Text>
      <TrackRow
        image={{
          uri: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        title="Cool song"
        artist="Artist"
      />
      <TrackRow
        image={{
          uri: 'https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        title="Cool song"
        artist="Artist"
      />
      <TrackRow
        image={{
          uri: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        title="Cool song"
        artist="Artist"
      />
      <TrackRow
        image={{
          uri: 'https://images.pexels.com/photos/744318/pexels-photo-744318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        title="Cool song"
        artist="Artist"
      />
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
