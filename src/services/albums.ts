import {backendURL} from '_src/config/backend';
import {Album} from '_src/utils/types/Songs';
import {get} from './RESTMethods';

export async function getAlbumsByArtist(id: string) {
  const res = await get<Array<Album>>(`/albums/artist/${id}`);
  const albums = res.data.map(album => ({
    ...album,
    image: `${backendURL}/${album.image}`,
    author: {...album.author, image: `${backendURL}/${album.author.image}`},
  }));
  return {...res, data: albums};
}
