import * as Yup from 'yup';

export const PlaylistSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese el título de la playlist'),
  image: Yup.string().required('Seleccione una imagen de su galería'),
});
