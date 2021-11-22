import {ImageURISource} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {backendURL} from '_src/config/backend';
import {formatImageDoc, formatSongImages} from '_src/utils';
import {Playlist} from '_src/utils/types/Playlist';
import {
  CustomResponse,
  del,
  get,
  getSession,
  manageResponse,
  post,
} from './RESTMethods';

const playlistURL = '/playlists';

export async function getPlaylists() {
  const res = await get<Array<Playlist>>(playlistURL);
  const data = res.data.map(formatImageDoc);
  return {...res, data};
}

export function formatPlaylistData(playlist: Playlist, file?: Asset) {
  const data = new FormData();
  data.append('title', playlist.title);
  if (!file) return data;
  const image = {
    uri: file.uri,
    name: playlist.image,
    type: file.type,
  };
  data.append('image', image);
  return data;
}

export async function createPlaylist(
  playlist: Playlist,
  file: ImageURISource,
): Promise<CustomResponse<Playlist>> {
  const body = formatPlaylistData(playlist, file);
  const token = await getSession();
  const res = await fetch(`${backendURL}${playlistURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body,
  }).then(r => manageResponse<Playlist>(r));
  return {...res, data: formatImageDoc(res.data)};
}

export async function updatePlaylist(
  playlist: Playlist,
  file?: ImageURISource,
): Promise<CustomResponse<String>> {
  const token = await getSession();
  const res = await fetch(`${backendURL}${playlistURL}/${playlist._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formatPlaylistData(playlist, file),
  }).then(r => manageResponse<String>(r));
  return res;
}

export async function getPlaylist(id: string) {
  const res = await get<Playlist>(`${playlistURL}/${id}`);
  return {
    ...res,
    data: {...res.data, songs: res.data.songs?.map(formatSongImages)},
  };
}

export async function addSongToPlayList(song: string, playList: string) {
  await post<Playlist>(`${playlistURL}/${playList}/song/${song}`);
}

export async function removeSongFromPlayList(song: string, playList: string) {
  return del<String>(`${playlistURL}/${playList}/song/${song}`);
}

export async function removePlaylist(playlist: string) {
  return del<String>(`${playlistURL}/${playlist}`);
}
