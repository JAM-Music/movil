import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Album from '_src/components/Album';
import Artist from '_src/components/Artist';
import Content from '_src/components/Content';
import List from '_src/components/List';
import SearchBar from '_src/components/SearchBar';
import TrackRow from '_src/components/TrackRow';
import {useSearch} from '_src/hooks';
import Doc from '_src/utils/types/Doc';
import {DashboardScreens} from '_src/utils/types/Screens';
import {
  Album as AlbumType,
  Artist as ArtistType,
  Song,
} from '_src/utils/types/Songs';
import style from './Search.style';

export type SearchProps = {
  navigation: NavigationProp<DashboardScreens>;
};

const Search: React.FC<SearchProps> = ({navigation}) => {
  const {search, results, loading, noFound, noSearch} = useSearch();

  return (
    <Content>
      <SearchBar search={search} />
      {noFound && (
        <Text style={style.noFoundMsg}>No encontramos lo que buscabas :(</Text>
      )}
      {noSearch && (
        <View style={style.searchMsgWrapper}>
          <Icon
            name="arrow-upward"
            tvParallaxProperties
            color={R.colors.PRIMARY}
          />
          <Text style={style.searchMsg}>
            Escribe en el recuadro para buscar
          </Text>
        </View>
      )}
      {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
      <List
        title="Canciones"
        coponent={(song: Doc) => {
          const _song = song as Song;
          return (
            <TrackRow
              key={song._id}
              image={{uri: _song.album.image}}
              title={_song.title}
              artist={_song.album.author.name}
            />
          );
        }}
        data={results.songs}
      />
      <List
        title="Artistas"
        coponent={(artist: Doc) => {
          const _artist = artist as ArtistType;
          return (
            <Artist
              key={_artist._id}
              image={{uri: _artist.image}}
              name={_artist.name}
              onPress={() => navigation.navigate('artist', {artist: _artist})}
            />
          );
        }}
        data={results.artists}
      />
      <List
        title="Albumes"
        coponent={(album: Doc) => {
          const _album = album as AlbumType;
          return (
            <Album
              key={_album._id}
              image={{uri: _album.image}}
              title={_album.title}
              artist={_album.author.name}
              onPress={() => navigation.navigate('album', {album: _album})}
            />
          );
        }}
        data={results.albums}
      />
    </Content>
  );
};

export default Search;
