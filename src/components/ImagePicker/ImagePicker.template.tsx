import React from 'react';
import {ImageURISource, Pressable, View} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import R from '_src/assets/R';
import ErrorText from '../ErrorText';
import style from './ImagePicker.style';

export type ImagePickerTemplateProps = {
  image?: ImageURISource;
  onPress?: () => any;
  error?: string;
};

const Template: React.FC<ImagePickerTemplateProps> = ({
  image,
  onPress,
  error,
}) => {
  if (image) {
    return (
      <View>
        <Pressable style={style.button} onPress={onPress}>
          <Image source={image} style={style.image} />
        </Pressable>
        {!!error && <ErrorText error={error} />}
      </View>
    );
  }
  return (
    <View>
      <Pressable style={style.button} onPress={onPress}>
        <Icon
          color={R.colors.BORDER}
          name="image"
          tvParallaxProperties
          size={100}
        />
        <Text style={style.text}>Seleccionar imagen</Text>
      </Pressable>
      {!!error && <ErrorText error={error} />}
    </View>
  );
};

export default Template;
