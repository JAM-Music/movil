import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import style from './NoPlaylist.style';

export type NoPlaylistProps = {};

const NoPlaylist: React.FC<NoPlaylistProps> = () => {
  return (
    <View style={style.noPlaylistWrapper}>
      <Text style={style.noPlaylistText}>
        Parece que aun no tienes una playlist
      </Text>
      <Button style={style.noPlaylistButton} title="Crea una playlist" />
    </View>
  );
};

export default NoPlaylist;
