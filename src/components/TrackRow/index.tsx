import React from 'react';
import {ImageURISource, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import R from '_src/assets/R';
import style from './TrackRow.style';

export type TrackRowProps = {
  image: ImageURISource;
  title: string;
  artist: string;
};

const TrackRow: React.FC<TrackRowProps> = ({image, title, artist}) => {
  return (
    <View style={style.row}>
      <Image style={style.image} source={image} />
      <View style={style.textWrapper}>
        <Text>{title}</Text>
        <Text style={{color: R.colors.BORDER}}>{artist}</Text>
      </View>
      <Icon
        type="material"
        name="more-horiz"
        tvParallaxProperties
        color={R.colors.SECONDARY}
      />
    </View>
  );
};

export default TrackRow;
