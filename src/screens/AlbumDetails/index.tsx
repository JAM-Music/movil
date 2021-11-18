import {Link} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, FlatList, ImageBackground, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import R from '_src/assets/R';
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
    <View>
      <ImageBackground
        source={{uri: album.image}}
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
          <View>
            <Text h2>{album.title}</Text>
            <Link
              to={{screen: 'artist', params: {artist: album.author}}}
              style={{color: R.colors.LINKS, fontSize: 15, paddingLeft: 10}}>
              by {album.author.name}
            </Link>
          </View>
          <Icon
            name="play-arrow"
            tvParallaxProperties
            reverse
            containerStyle={{position: 'absolute', top: 50, right: 20}}
            color={R.colors.PRIMARY}
          />
        </View>
      </ImageBackground>
      <View style={{padding: 20}}>
        {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
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

export default AlbumDetails;
