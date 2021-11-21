import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import PlaylistModal from '../PlaylistModal';
import style from './NoPlaylist.style';

export type NoPlaylistProps = {};

const NoPlaylist: React.FC<NoPlaylistProps> = () => {
  const [modal, setModal] = useState(false);

  return (
    <View style={style.noPlaylistWrapper}>
      <Text style={style.noPlaylistText}>
        Parece que aun no tienes una playlist
      </Text>
      <Button
        style={style.noPlaylistButton}
        onPress={() => setModal(true)}
        title="Crea una playlist"
      />
      <PlaylistModal visible={modal} onClose={() => setModal(false)} />
    </View>
  );
};

export default NoPlaylist;
