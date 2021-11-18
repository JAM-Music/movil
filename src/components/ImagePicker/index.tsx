import React, {useCallback} from 'react';
import {ImageURISource} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Template from './ImagePicker.template';
export type ImagePickerProps = {
  image?: ImageURISource;
  onSelect?: (image: ImageURISource) => any;
  error?: string;
};

const ImagePicker: React.FC<ImagePickerProps> = ({image, onSelect, error}) => {
  const launchGallery = useCallback(async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (res.assets && onSelect) {
      onSelect(res.assets[0]);
    }
  }, [onSelect]);

  return <Template onPress={launchGallery} image={image} error={error} />;
};

export default ImagePicker;
