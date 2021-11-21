import {
  formatAlbumImages,
  formatArtistsImage,
  formatSongImages,
} from '_src/utils';
import {SearchRes, Song} from '_src/utils/types/Songs';
import {CustomResponse, get} from './RESTMethods';

export async function search(str: String): Promise<CustomResponse<SearchRes>> {
  const res = await get<SearchRes>(`/songs?search=${str}`);
  const {data} = res;
  return {
    ...res,
    data: {
      songs: data.songs.map(formatSongImages),
      albums: data.albums.map(formatAlbumImages),
      artists: data.artists.map(formatArtistsImage),
    },
  };
}

export async function getSongsByArtist(id: string) {
  const res = await get<Array<Song>>(`/songs/artist/${id}`);
  return {...res, data: res.data.map(formatSongImages)};
}

export async function getSongsByAlbum(id: string) {
  const res = await get<Array<Song>>(`/songs/album/${id}`);
  return {...res, data: res.data.map(formatSongImages)};
}

export async function getRecents() {
  const res = await get<Array<Song>>('/songs/recents');
  return {...res, data: res.data.map(formatSongImages)};
}
