import {NavigationProp} from '@react-navigation/core';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {ButtonGroup, Text} from 'react-native-elements';
import R from '_src/assets/R';
import Album from '_src/components/Album';
import TrackRow from '_src/components/TrackRow';
import {useArtist} from '_src/hooks';
import {RootScreens} from '_src/utils/types/Screens';
import {Artist} from '_src/utils/types/Songs';
import style from './ArtistDetails.style';

export type ArtistDetailsProps = {
  route: {params: {artist: Artist}};
  navigation: NavigationProp<RootScreens>;
};

const ArtistDetails: React.FC<ArtistDetailsProps> = ({route, navigation}) => {
  const {artist} = route.params;
  const [index, setIndex] = useState(0);
  const {loading, songs, albums} = useArtist(artist._id);
  const showSongStyle = useMemo(
    () => ({display: index === 0 ? 'flex' : 'none'} as StyleProp<ViewStyle>),
    [index],
  );
  const showAlbumStyle = useMemo(
    () => ({display: index === 1 ? 'flex' : 'none'} as StyleProp<ViewStyle>),
    [index],
  );

  return (
    <View>
      <ImageBackground
        source={{uri: artist.image}}
        blurRadius={0.75}
        style={{height: 250, justifyContent: 'flex-end'}}
        resizeMode="cover">
        <Text
          h2
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: R.colors.BG_TRANSPARENT,
          }}>
          {artist.name}
        </Text>
      </ImageBackground>
      <View style={{padding: 20}}>
        <ButtonGroup
          selectedIndex={index}
          onPress={setIndex}
          buttons={['Canciones', 'Albumes']}
        />
        {loading && <ActivityIndicator color={R.colors.PRIMARY} size={50} />}
        <FlatList
          style={showSongStyle}
          data={songs}
          renderItem={({item}) => (
            <TrackRow
              artist={artist.name}
              image={{uri: item.album.image}}
              title={item.title}
            />
          )}
        />
        <FlatList
          style={showAlbumStyle}
          data={albums}
          renderItem={({item}) => (
            <Album
              artist={item.author.name}
              image={{uri: item.image}}
              title={item.title}
              onPress={() => navigation.navigate('album', {album: item})}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ArtistDetails;
