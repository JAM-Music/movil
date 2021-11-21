import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Content from '_src/components/Content';
import PlaylistModal from '_src/components/PlaylistModal';
import NoPlaylist from '_src/components/NoPlaylist';
import Thumbnail from '_src/components/Thumbnail';
import {usePlaylists} from '_src/hooks';
import {RootScreens} from '_src/utils/types/Screens';
import style from './PlaylistList.style';

export type PlaylistListProps = {
  navigation: NavigationProp<RootScreens>;
};

const PlaylistList: React.FC<PlaylistListProps> = ({navigation}) => {
  const {playlists, loading} = usePlaylists();
  const [modalNew, setModalNew] = useState(false);

  return (
    <Content>
      <View style={style.header}>
        <Text h3>Playlists</Text>
        <Icon
          tvParallaxProperties
          name="add"
          type="material"
          reverse
          color={R.colors.SECONDARY}
          onPress={() => setModalNew(true)}
        />
      </View>
      {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
      {!playlists.length && !loading && <NoPlaylist />}
      <View style={style.playlists}>
        {playlists.map(playlist => (
          <Thumbnail
            image={{uri: playlist.image}}
            title={playlist.title}
            key={playlist._id}
            style={style.thumbnail}
            onPress={() => navigation.navigate('playlistDetail', {playlist})}
          />
        ))}
      </View>
      <PlaylistModal visible={modalNew} onClose={() => setModalNew(false)} />
    </Content>
  );
};

export default PlaylistList;
