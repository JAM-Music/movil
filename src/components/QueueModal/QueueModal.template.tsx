import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Track} from 'react-native-track-player';
import Content from '../Content';
import QueueItem from '../QueueItem';
import TextWithIcon from '../TextWithIcon';
import style from './QueueModal.style';

export type QueueModalTemplateProps = {
  tracks: Array<Track>;
  onClose?: () => any;
  onRemove: (index: number) => any;
};

const Template: React.FC<QueueModalTemplateProps> = props => {
  return (
    <Content style={style.content}>
      <Text h3 style={style.title}>
        Canciones siguientes
      </Text>
      {props.tracks.map((track, index) => (
        <QueueItem
          key={index}
          author={track.artist}
          onDelete={() => {
            props.onRemove(index);
          }}
          title={track.title}
        />
      ))}
      <View style={style.closeButton}>
        <TextWithIcon
          muted
          text="Cerrar"
          iconName="do-not-disturb"
          onPress={props.onClose}
        />
      </View>
    </Content>
  );
};

export default Template;
