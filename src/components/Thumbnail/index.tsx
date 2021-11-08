import React from 'react';
import {ImageURISource, View, ViewStyle} from 'react-native';
import {Image, Text} from 'react-native-elements';
import styles from './Thumbnail.style';
export type ThumbnailProps = {
  image: ImageURISource;
  title: string;
  style?: ViewStyle;
};

const Thumbnail: React.FC<ThumbnailProps> = ({image, title, style}) => {
  return (
    <View style={[style]}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Thumbnail;
