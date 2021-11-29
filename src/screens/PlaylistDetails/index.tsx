import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import TrackRow from '_src/components/TrackRow';
import TrackRowPlayList from '_src/components/TrackRowPlayList';
import {usePlaylistSongs} from '_src/hooks';
import {Playlist} from '_src/utils/types/Playlist';
import SearchBar from '_src/components/SearchBar';
import List from '_src/components/List';
import {useSearch} from '_src/hooks';
import Doc from '_src/utils/types/Doc';
import {Song} from '_src/utils/types/Songs';
import style from './PlaylistDetails.style';
import Content from '_src/components/Content';
import PlaylistModal from '_src/components/PlaylistModal';
import {NavigationProp} from '@react-navigation/core';
import {RootScreens} from '_src/utils/types/Screens';
import {useSongs} from '_src/hooks/useSong';

export type PlaylistDetailsProps = {
  route: {params: {playlist: Playlist}};
  navigation: NavigationProp<RootScreens>;
};

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({
  route,
  navigation,
}) => {
  const _id = useMemo(() => route.params.playlist._id, [route.params]);
  const [loading, setLoading] = useState(false);
  const {addSong, playlist, fetchData} = usePlaylistSongs(_id);
  const {search, results, loading: loadingSearch, noFound} = useSearch();
  const [modal, setModal] = useState(false);
  const {assingSongs} = useSongs();

  useEffect(() => {
    setLoading(true);
    fetchData(_id).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content fluid>
      <ImageBackground
        source={{uri: playlist.image}}
        blurRadius={0.75}
        style={style.background}
        resizeMode="cover">
        <View style={style.main}>
          <View style={style.titleWrapper}>
            <Text h2>{playlist.title}</Text>
            <Icon
              name="edit"
              tvParallaxProperties
              containerStyle={style.editIcon}
              color={R.colors.BORDER}
              onPress={() => setModal(true)}
            />
          </View>
          <Icon
            name="play-arrow"
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
            onPress={() => {
              navigation.navigate('musicPlayer');
              assingSongs(playlist.songs || []);
            }}
          />
        </View>
      </ImageBackground>
      <View style={style.songsWrapper}>
        {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
        {!playlist.songs?.length && (
          <Text style={style.emptyMsg}>
            🕸 Aun no tienes canciones agregadas 🕸
          </Text>
        )}
        {playlist.songs?.map((item, index) => (
          <TrackRow
            key={item._id}
            song={item}
            playlist={playlist._id}
            onPress={() => {
              assingSongs(playlist.songs?.slice(index) || []);
              navigation.navigate('musicPlayer');
            }}
          />
        ))}
        <View style={style.searchWrapper}>
          <Text style={style.searchMsg}>Encontremos algo para tu playlist</Text>
          <SearchBar search={search} />
          {noFound && (
            <Text style={style.noFoundMsg}>
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
                  onPress={() => addSong(_song)}
                />
              );
            }}
            data={results.songs}
          />
        </View>
      </View>
      <PlaylistModal
        onClose={() => setModal(false)}
        visible={modal}
        playlist={playlist}
        onDelete={() => {
          setModal(false);
          navigation.goBack();
        }}
      />
    </Content>
  );
};

export default PlaylistDetails;
