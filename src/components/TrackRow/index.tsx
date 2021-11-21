import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import R from '_src/assets/R';
import {Song} from '_src/utils/types/Songs';
import SongModal from '../SongModal';
import style from './TrackRow.style';

export type TrackRowProps = {
  song: Song;
  playlist?: string;
};

const TrackRow: React.FC<TrackRowProps> = ({song, playlist}) => {
  const [modal, setModal] = useState(false);

  return (
    <Pressable style={style.row} onPress={() => console.log('@@@ play')}>
      <Image style={style.image} source={{uri: song.album.image}} />
      <View style={style.textWrapper}>
        <Text>{song.title}</Text>
        <Text style={{color: R.colors.BORDER}}>{song.album.author.name}</Text>
      </View>
      <Icon
        type="material"
        name="more-horiz"
        tvParallaxProperties
        color={R.colors.SECONDARY}
        onPress={() => setModal(true)}
      />
      <SongModal
        song={song}
        visible={modal}
        onClose={() => setModal(false)}
        playlist={playlist}
      />
    </Pressable>
  );
};

export default TrackRow;
