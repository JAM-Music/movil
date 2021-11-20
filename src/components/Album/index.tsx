import React from 'react';
import {ImageURISource, Pressable, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import style from './Album.style';

export type AlbumProps = {
  title: string;
  image: ImageURISource;
  artist: string;
  onPress?: () => void;
};

const Album: React.FC<AlbumProps> = ({image, title, artist, onPress}) => {
  return (
    <Pressable onPress={onPress} style={style.wrapper}>
      <Image style={style.image} source={image} />
      <View style={style.content}>
        <Text>{title}</Text>
        <Text style={style.separator}>|</Text>
        <Text style={style.artist}>{artist}</Text>
      </View>
    </Pressable>
  );
};

export default Album;
