import {ImageURISource} from 'react-native';
import {backendURL} from '_src/config/backend';
import {Playlist} from '_src/utils/types/Playlist';
import {
  CustomResponse,
  get,
  getSession,
  manageResponse,
  post,
} from './RESTMethods';

const playlistURL = '/playlists';

export async function getPlaylists() {
  const res = await get<Array<Playlist>>(playlistURL);
  const data = res.data.map(playlist => ({
    ...playlist,
    image: `${backendURL}/${playlist.image}`,
  }));
  return {...res, data};
}

export async function createPlaylist(
  playlist: Playlist,
  file: ImageURISource,
): Promise<CustomResponse<Playlist>> {
  const data = new FormData();
  const image = {...file, name: ''};
  image.name = `image.${playlist.image.split('.').pop()}`;
  data.append('title', playlist.title);
  data.append('image', image);

  const token = await getSession();
  const res = await fetch(`${backendURL}${playlistURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: data,
  }).then(r => manageResponse<Playlist>(r));
  res.data.image = `${backendURL}/${res.data.image}`;
  return res;
}

export async function getPlaylist(id: string) {
  const res = await get<Playlist>(`${playlistURL}/${id}`);
  const songs = res.data.songs?.map(song => ({
    ...song,
    album: {
      ...song.album,
      image: `${backendURL}/${song.album.image}`,
      author: {
        ...song.album.author,
        iamge: `${backendURL}/${song.album.author.image}`,
      },
    },
  }));
  return {...res, data: {...res.data, songs}};
}

export async function addSongToPlayList(song: string, playList: string) {
  await post<Playlist>(`${playlistURL}/${playList}/song/${song}`);
}
