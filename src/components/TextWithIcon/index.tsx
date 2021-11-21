import React from 'react';
import {Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import R from '_src/assets/R';
import style from './TextWithIcon.style';

export type TextWithIconProps = {
  iconName: string;
  text: string;
  onPress?: () => any;
  muted?: boolean;
};

const TextWithIcon: React.FC<TextWithIconProps> = ({
  iconName,
  text,
  onPress,
  muted,
}) => {
  return (
    <Pressable style={style.row} onPress={onPress}>
      <Icon
        name={iconName}
        containerStyle={style.icon}
        color={muted ? R.colors.BORDER : R.colors.TEXT}
      />
      <Text style={[style.text, muted ? style.muted : {}]}>{text}</Text>
    </Pressable>
  );
};

export default TextWithIcon;
