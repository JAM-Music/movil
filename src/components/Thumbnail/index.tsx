import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {ImageURISource, Pressable, View, ViewStyle} from 'react-native';
import {Image, Text} from 'react-native-elements';
import styles from './Thumbnail.style';
export type ThumbnailProps = {
  image: ImageURISource;
  title: string;
  style?: ViewStyle;
  onPress?: () => any;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  image,
  title,
  style,
  onPress,
}) => {
  return (
    <Pressable style={[style]} onPress={onPress}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default Thumbnail;
