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
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: R.colors.BORDER,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <Image
        style={{aspectRatio: 1, width: 45, borderRadius: 5, marginRight: 10}}
        source={image}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{}}>{title}</Text>
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
