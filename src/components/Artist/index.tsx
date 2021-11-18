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
    <Pressable
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
      <Image source={image} style={{height: 50, width: 50, borderRadius: 25}} />
      <Text style={{marginLeft: 5, fontSize: 14}}>{name}</Text>
    </Pressable>
  );
};

export default Artist;
