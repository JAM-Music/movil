import React from 'react';
import {View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {Song} from '_src/utils/types/Songs';
import Content from '../Content';
import TextWithIcon from '../TextWithIcon';
import style from './SongModal.style';

export type SongModalTemplateProps = {
  song: Song;
  isPlaylist: boolean;
  gotoArtist: () => any;
  gotoAlbum: () => any;
  addToQueue: () => any;
  removeFromPlaylist: () => any;
  onClose: () => any;
};

const Template: React.FC<SongModalTemplateProps> = ({
  song,
  isPlaylist,
  gotoAlbum,
  gotoArtist,
  removeFromPlaylist,
  addToQueue,
  onClose,
}) => {
  return (
    <Content style={style.content}>
      <Image source={{uri: song.album.image}} style={style.image} />
      <Text h2 style={style.title}>
        {song.title}
      </Text>
      <Text h4 style={style.autor}>
        {song.album.author.name}
      </Text>
      <View style={style.main}>
        <TextWithIcon
          iconName="person"
          text="Ir al artista"
          onPress={gotoArtist}
        />
        <TextWithIcon iconName="album" text="Ir al album" onPress={gotoAlbum} />
        <TextWithIcon
          iconName="queue-music"
          text="Agregar a la cola"
          onPress={addToQueue}
        />
        {isPlaylist && (
          <TextWithIcon
            iconName="remove"
            text="Eliminar de esta playlist"
            onPress={removeFromPlaylist}
          />
        )}
      </View>
      <TextWithIcon
        muted
        iconName="do-not-disturb"
        text="Cerrar"
        onPress={onClose}
      />
    </Content>
  );
};

export default Template;
