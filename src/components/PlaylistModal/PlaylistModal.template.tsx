import {FormikErrors, FormikTouched} from 'formik';
import React from 'react';
import {ImageURISource, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from '_src/assets/R';
import {Playlist} from '_src/utils/types/Playlist';
import Content from '../Content';
import ImagePicker from '../ImagePicker';
import style from './PlaylistModal.style';

export type PlaylistModalTemplateProps = {
  onClose: () => any;
  onSubmit: () => any;
  onDelete: () => any;
  handleChange: (name: string) => any;
  handleBlur: (name: string) => any;
  handleFile: (f: ImageURISource) => any;
  touched: FormikTouched<Playlist>;
  errors: FormikErrors<Playlist>;
  loading?: boolean;
  values: Playlist;
  edit?: boolean;
};

const Template: React.FC<PlaylistModalTemplateProps> = ({
  onClose,
  onSubmit,
  onDelete,
  handleBlur,
  handleChange,
  handleFile,
  touched,
  errors,
  loading,
  values,
  edit,
}) => {
  return (
    <Content style={style.content}>
      <Text h3 style={style.title}>
        {edit ? 'Edita' : 'Crea'} tu playlist
      </Text>
      <Input
        autoCompleteType
        placeholder="Título"
        value={values.title}
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
      <View style={style.buttonsWrapper}>
        <Button title="Guardar" loading={loading} onPress={onSubmit} />
        {edit && (
          <Button
            title="Eliminar"
            containerStyle={style.cancelButton}
            onPress={onDelete}
            icon={<Icon name="delete" color={R.colors.TEXT} size={20} />}
            buttonStyle={{backgroundColor: R.colors.ERROR}}
          />
        )}
        <Button
          title="Cancelar"
          containerStyle={style.cancelButton}
          onPress={onClose}
          buttonStyle={{backgroundColor: R.colors.BORDER}}
        />
      </View>
    </Content>
  );
};

export default Template;
