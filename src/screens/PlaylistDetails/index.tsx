import {Link} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import TrackRow from '_src/components/TrackRow';
import TrackRowPlayList from '_src/components/TrackRowPlayList';
import {usePlaylistSongs, usePlaylist} from '_src/hooks';
import {Playlist} from '_src/utils/types/Playlist';
import SearchBar from '_src/components/SearchBar';
import List from '_src/components/List';
import {useSearch} from '_src/hooks';
import Doc from '_src/utils/types/Doc';
import {Song} from '_src/utils/types/Songs';
import style from './PlaylistDetails.style';
import Content from '_src/components/Content';

export type PlaylistDetailsProps = {
  route: {params: {playlist: Playlist}};
};

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({route}) => {
  const {playlist} = route.params;
  const {songs, loading, addSong} = usePlaylistSongs(playlist._id);
  const {search, results, loading: loadingSearch, noFound} = useSearch();

  function onPress(song: Song): void {
    addSong(song);
  }

  return (
    <Content style={{padding: 0}}>
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
        <Text
          style={{
            fontSize: 18,
            color: R.colors.TEXT,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Encontremos algo para tu playlist
        </Text>
        <View style={{marginTop: 20}}>
          <SearchBar search={search} />
          {noFound && (
            <Text
              style={{
                fontSize: 18,
                color: R.colors.BORDER,
                marginTop: 20,
                textAlign: 'center',
              }}>
              No encontramos lo que buscabas :(
            </Text>
          )}
          {loadingSearch && (
            <ActivityIndicator color={R.colors.PRIMARY} size={50} />
          )}
          <List
            title="Canciones"
            coponent={(song: Doc) => {
              const _song = song as Song;
              return (
                <TrackRowPlayList
                  key={song._id}
                  image={{uri: _song.album.image}}
                  title={_song.title}
                  artist={_song.album.author.name}
                  onPress={() => onPress(_song)}
                />
              );
            }}
            data={results.songs}
          />
        </View>
      </View>
    </Content>
  );
};

export default PlaylistDetails;
