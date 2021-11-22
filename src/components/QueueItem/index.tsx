import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import R from '_src/assets/R';
import style from './QueueItem.style';

export type QueueItemProps = {
  title?: string;
  author?: string;
  onDelete?: () => any;
};

const QueueItem: React.FC<QueueItemProps> = props => {
  return (
    <View style={style.row}>
      <View>
        <Text style={style.title}>{props.title}</Text>
        <Text style={{color: R.colors.BORDER}}>{props.author}</Text>
      </View>
      <Icon name="delete" onPress={props.onDelete} color={R.colors.ERROR} />
    </View>
  );
};

export default QueueItem;
