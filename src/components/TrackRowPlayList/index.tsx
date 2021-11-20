import React from 'react';
import {ImageURISource, View} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import R from '_src/assets/R';
import style from './TrackRowPlayList.style';
export type TrackRowProps = {
  image: ImageURISource;
  title: string;
  artist: string;
  onPress: (param: any) => any;
};

const TrackRowPlayList: React.FC<TrackRowProps> = ({
  image,
  title,
  artist,
  onPress,
}) => {
  return (
    <View style={style.content}>
      <Image style={style.content} source={image} />
      <View style={style.textWrappers}>
        <Text>{title}</Text>
        <Text style={{color: R.colors.BORDER}}>{artist}</Text>
      </View>
      <Button title="Add" onPress={onPress} />
    </View>
  );
};

export default TrackRowPlayList;
