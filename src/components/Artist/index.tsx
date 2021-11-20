import React from 'react';
import {ImageURISource, Pressable} from 'react-native';
import {Image, Text} from 'react-native-elements';
import style from './Artist.style';

export type ArtistProps = {
  image: ImageURISource;
  name: string;
  onPress?: () => any;
};

const Artist: React.FC<ArtistProps> = ({image, name, onPress}) => {
  return (
    <Pressable onPress={onPress} style={style.wrapper}>
      <Image source={image} style={style.image} />
      <Text style={style.name}>{name}</Text>
    </Pressable>
  );
};

export default Artist;
