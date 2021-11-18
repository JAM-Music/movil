import {useFormik} from 'formik';
import React, {useCallback, useRef, useState} from 'react';
import {ImageURISource, Modal} from 'react-native';
import {usePlaylist} from '_src/hooks';
import {Playlist} from '_src/utils/types/Playlist';
import {PlaylistSchema} from '_src/utils/validators/playlists';
import Template from './CreatePlaylistModal.template';
export type CreatePlaylistModalProps = {
  onClose?: () => any;
  visible?: boolean;
};

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  visible,
  onClose,
}) => {
  const {save} = usePlaylist();
  const file = useRef<ImageURISource>();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    setErrors,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
    resetForm,
  } = useFormik({
    initialValues: {title: '', image: ''} as Playlist,
    validationSchema: PlaylistSchema,
    onSubmit(val) {
      if (!file.current) {
        return;
      }
      setLoading(true);
      save(val, file.current)
        .then(() => {
          resetForm();
          if (onClose) {
            onClose();
          }
        })
        .catch(e => setErrors(e.data || {}))
        .finally(() => setLoading(false));
    },
  });

  const close = useCallback(() => {
    resetForm();
    if (onClose) {
      onClose();
    }
  }, [onClose, resetForm]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={close}
      animationType="slide">
      <Template
        onClose={close}
        onSubmit={handleSubmit}
        loading={loading}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
        values={values}
        handleFile={(f: ImageURISource) => (file.current = f)}
      />
    </Modal>
  );
};

export default CreatePlaylistModal;
