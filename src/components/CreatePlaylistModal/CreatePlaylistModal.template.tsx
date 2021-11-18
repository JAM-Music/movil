import {FormikErrors, FormikTouched} from 'formik';
import React from 'react';
import {ImageURISource, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from '_src/assets/R';
import {Playlist} from '_src/utils/types/Playlist';
import Content from '../Content';
import ImagePicker from '../ImagePicker';
import style from './CreatePlaylistModal.style';

export type CreatePlaylistModalTemplateProps = {
  onClose: () => any;
  onSubmit: () => any;
  handleChange: (name: string) => any;
  handleBlur: (name: string) => any;
  handleFile: (f: ImageURISource) => any;
  touched: FormikTouched<Playlist>;
  errors: FormikErrors<Playlist>;
  loading?: boolean;
  values: Playlist;
};

const Template: React.FC<CreatePlaylistModalTemplateProps> = ({
  onClose,
  onSubmit,
  handleBlur,
  handleChange,
  handleFile,
  touched,
  errors,
  loading,
  values,
}) => {
  return (
    <Content style={style.content}>
      <Text h3 style={{marginBottom: 20}}>
        Crea tu playlist
      </Text>
      <Input
        autoCompleteType
        placeholder="Título"
        onChangeText={handleChange('title')}
        onBlur={handleBlur('title')}
        errorMessage={touched.title ? errors.title : undefined}
        leftIcon={<Icon name="queue-music" size={25} color={R.colors.TEXT} />}
      />
      <ImagePicker
        image={values.image ? {uri: values.image} : undefined}
        error={touched.image ? errors.image : undefined}
        onSelect={file => {
          handleChange('image')(file.uri);
          handleFile(file);
        }}
      />
      <View style={{width: '90%'}}>
        <Button title="Guardar" loading={loading} onPress={onSubmit} />
        <Button
          title="Cancelar"
          containerStyle={{marginTop: 20}}
          onPress={onClose}
          buttonStyle={{backgroundColor: R.colors.BORDER}}
        />
      </View>
    </Content>
  );
};

export default Template;
