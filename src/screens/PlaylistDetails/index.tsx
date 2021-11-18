import {Link} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import TrackRow from '_src/components/TrackRow';
import {usePlaylistSongs} from '_src/hooks';
import {Playlist} from '_src/utils/types/Playlist';
import style from './PlaylistDetails.style';

export type PlaylistDetailsProps = {
  route: {params: {playlist: Playlist}};
};

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({route}) => {
  const {playlist} = route.params;
  const {songs, loading} = usePlaylistSongs(playlist._id);

  return (
    <View>
      <ImageBackground
        source={{uri: playlist.image}}
        blurRadius={0.75}
        style={{height: 250, justifyContent: 'flex-end'}}
        resizeMode="cover">
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: R.colors.BG_TRANSPARENT,
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text h2>{playlist.title}</Text>
            <Icon
              name="edit"
              tvParallaxProperties
              style={{color: R.colors.BORDER, marginLeft: 10}}
              color={R.colors.BORDER}
            />
          </View>
          <Icon
            name="play-arrow"
            tvParallaxProperties
            reverse
            containerStyle={{position: 'absolute', top: '50%', right: 20}}
            color={R.colors.PRIMARY}
          />
        </View>
      </ImageBackground>
      <View style={{padding: 20}}>
        {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
        {!songs?.length && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              fontSize: 16,
              color: R.colors.BORDER,
            }}>
            🕸 Aun no tienes canciones agregadas 🕸
          </Text>
        )}
        <FlatList
          data={songs}
          renderItem={({item}) => (
            <TrackRow
              artist={item.album.author.name}
              image={{uri: item.album.image}}
              title={item.title}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PlaylistDetails;
