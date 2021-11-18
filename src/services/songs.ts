import {backendURL} from '_src/config/backend';
import {SearchRes, Song} from '_src/utils/types/Songs';
import {get} from './RESTMethods';

export async function search(str: String) {
  const res = await get<SearchRes>(`/songs?search=${str}`);
  const {data} = res;
  const songs = data.songs.map(song => ({
    ...song,
    album: {...song.album, image: `${backendURL}/${song.album.image}`},
  }));
  const albums = data.albums.map(album => ({
    ...album,
    image: `${backendURL}/${album.image}`,
    author: {...album.author, image: `${backendURL}/${album.author.image}`},
  }));
  const artists = data.artists.map(artist => ({
    ...artist,
    image: `${backendURL}/${artist.image}`,
  }));
  return {...res, data: {songs, albums, artists}};
}

export async function getSongsByArtist(id: string) {
  const res = await get<Array<Song>>(`/songs/artist/${id}`);
  const songs = res.data.map(song => ({
    ...song,
    album: {...song.album, image: `${backendURL}/${song.album.image}`},
  }));
  return {...res, data: songs};
}

export async function getSongsByAlbum(id: string) {
  const res = await get<Array<Song>>(`/songs/album/${id}`);
  const songs = res.data.map(song => ({
    ...song,
    album: {...song.album, image: `${backendURL}/${song.album.image}`},
  }));
  return {...res, data: songs};
}
