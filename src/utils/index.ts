import {backendURL} from '_src/config/backend';
import {Album, Artist, Song} from './types/Songs';

export function formatImageUri(image: String) {
  return `${backendURL}/${image}`;
}

export function formatImageDoc<T extends {image: string}>(doc: T): T {
  return {
    ...doc,
    image: formatImageUri(doc.image),
  };
}

export function formatArtistsImage(artist: Artist): Artist {
  return formatImageDoc<Artist>(artist);
}

export function formatAlbumImages(album: Album): Album {
  return {
    ...album,
    image: formatImageUri(album.image),
    author: formatArtistsImage(album.author),
  };
}

export function formatSongImages(song: Song): Song {
  return {
    ...song,
    album: formatAlbumImages(song.album),
  };
}

export function secondsToTime(time: number) {
  return (
    `${Math.floor(time / 60)}`.padStart(2, '0') +
    ':' +
    `${Math.floor(Math.abs(time % 60))}`.padStart(2, '0')
  );
}
