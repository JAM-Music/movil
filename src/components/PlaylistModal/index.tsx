import {useFormik} from 'formik';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ImageURISource, Modal} from 'react-native';
import {usePlaylist} from '_src/hooks';
import {Playlist} from '_src/utils/types/Playlist';
import {PlaylistSchema} from '_src/utils/validators/playlists';
import Template from './PlaylistModal.template';

export type PlaylistModalProps = {
  onClose?: () => any;
  onDelete?: () => any;
  visible?: boolean;
  playlist?: Playlist;
};

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  visible,
  onClose,
  onDelete,
  playlist,
}) => {
  const {save, remove} = usePlaylist();
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
    setValues,
  } = useFormik({
    initialValues: {title: '', image: ''} as Playlist,
    validationSchema: PlaylistSchema,
    onSubmit(val) {
      setLoading(true);
      save(val, file.current)
        .then(() => {
          if (!playlist?._id) resetForm();
          setLoading(false);
          if (onClose) onClose();
        })
        .catch(e => {
          setLoading(false);
          setErrors(e.data || {});
        });
    },
  });

  useEffect(() => {
    if (playlist) {
      setValues({...playlist});
    }
  }, [playlist, setValues]);

  const close = useCallback(() => {
    if (onClose) onClose();
    if (!playlist?._id) resetForm();
    else setValues({...playlist});
  }, [onClose, resetForm, playlist, setValues]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={close}
      animationType="slide">
      <Template
        onClose={close}
        onDelete={() => {
          if (playlist?._id) remove(playlist?._id);
          if (onDelete) onDelete();
        }}
        onSubmit={handleSubmit}
        loading={loading}
        handleBlur={handleBlur}
        handleChange={handleChange}
        touched={touched}
        errors={errors}
        values={values}
        edit={!!playlist?._id}
        handleFile={(f: ImageURISource) => (file.current = f)}
      />
    </Modal>
  );
};

export default PlaylistModal;
