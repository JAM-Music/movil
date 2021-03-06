import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Modal} from 'react-native';
import {usePlaylistSongs} from '_src/hooks';
import {useSongs} from '_src/hooks/useSong';
import {RootScreens} from '_src/utils/types/Screens';
import {Song} from '_src/utils/types/Songs';
import Template from './SongModal.template';
export type SongModalProps = {
  song: Song;
  visible?: boolean;
  playlist?: string;
  onClose?: () => any;
};

const SongModal: React.FC<SongModalProps> = ({
  song,
  visible,
  onClose = () => {},
  playlist,
}) => {
  const navigation = useNavigation<NavigationProp<RootScreens>>();
  const {removeSong} = usePlaylistSongs(playlist);
  const {addSong} = useSongs();

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <Template
        song={song}
        addToQueue={() => {
          addSong(song);
          onClose();
        }}
        removeFromPlaylist={() => {
          onClose();
          removeSong(song);
        }}
        gotoAlbum={() => {
          onClose();
          navigation.navigate('album', {album: song.album});
        }}
        gotoArtist={() => {
          onClose();
          navigation.navigate('artist', {artist: song.album.author});
        }}
        isPlaylist={!!playlist}
        onClose={onClose}
      />
    </Modal>
  );
};

export default SongModal;
