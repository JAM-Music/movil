import React from 'react';
import {Text} from 'react-native-elements';
import {secondsToTime} from '_src/utils';
import style from './Time.style';

export type TimeProps = {
  time: number;
};

const Time: React.FC<TimeProps> = ({time}) => {
  return <Text style={style.timeStamp}>{secondsToTime(time)}</Text>;
};

export default Time;
