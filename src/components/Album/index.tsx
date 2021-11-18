import React from 'react';
import {ImageURISource, Pressable, View} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import R from '_src/assets/R';
import style from './Album.style';

export type AlbumProps = {
  title: string;
  image: ImageURISource;
  artist: string;
  onPress?: () => void;
};

const Album: React.FC<AlbumProps> = ({image, title, artist, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <Image
        style={{aspectRatio: 1, width: 50, borderRadius: 5, marginRight: 10}}
        source={image}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>{title}</Text>
        <Text style={{marginHorizontal: 10, color: R.colors.SECONDARY}}>|</Text>
        <Text style={{color: R.colors.BORDER}}>{artist}</Text>
      </View>
    </Pressable>
  );
};

export default Album;
