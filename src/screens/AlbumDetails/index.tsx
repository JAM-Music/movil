import {Link} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Content from '_src/components/Content';
import TrackRow from '_src/components/TrackRow';
import {useAlbum} from '_src/hooks';
import {Album} from '_src/utils/types/Songs';
import style from './AlbumDetails.style';

export type AlbumDetailsProps = {
  route: {params: {album: Album}};
};

const AlbumDetails: React.FC<AlbumDetailsProps> = ({route}) => {
  const {album} = route.params;
  const {loading, songs} = useAlbum(album._id);
  return (
    <Content fluid>
      <ImageBackground
        source={{uri: album.image}}
        blurRadius={0.75}
        style={style.background}
        resizeMode="cover">
        <View style={style.main}>
          <View>
            <Text h2>{album.title}</Text>
            <Link
              to={{screen: 'artist', params: {artist: album.author}}}
              style={style.link}>
              by {album.author.name}
            </Link>
          </View>
          <Icon
            name="play-arrow"
            tvParallaxProperties
            reverse
            containerStyle={style.playIcon}
            color={R.colors.PRIMARY}
          />
        </View>
      </ImageBackground>
      <View style={style.songsWrapper}>
        {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
        {songs.map(item => (
          <TrackRow song={item} key={item._id} />
        ))}
      </View>
    </Content>
  );
};

export default AlbumDetails;
