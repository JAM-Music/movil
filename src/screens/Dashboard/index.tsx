import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Content from '_src/components/Content';
import Thumbnail from '_src/components/Thumbnail';
import TrackRow from '_src/components/TrackRow';
import {useUser} from '_src/hooks';
import style from './Dashboard.style';

export type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const {fullName} = useUser();
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
      <View style={style.playlistContainer}>
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 1"
        />
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 2"
        />
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 3"
        />
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 4"
        />
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 4"
        />
        <Thumbnail
          style={style.thumbnail}
          image={{
            uri: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          title="Playlist 4"
        />
      </View>
    </Content>
  );
};

export default Dashboard;
