import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import Doc from '_src/utils/types/Doc';
import style from './List.style';
export type ListProps = {
  data?: Array<Doc>;
  title: string;
  coponent: (doc: Doc) => JSX.Element;
};

const List: React.FC<ListProps> = ({data, title, coponent}) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <View style={style.content}>
      <Text h4>{title}</Text>
      {data.map(coponent)}
    </View>
  );
};

export default List;
