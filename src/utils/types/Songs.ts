import Doc from './Doc';

export interface Genre extends Doc {
  name: string;
  image?: string;
}

export interface Artist extends Doc {
  name: string;
  image: string;
}

export interface Album extends Doc {
  title: string;
  image: string;
  author: Artist;
}

export interface Song extends Doc {
  title: string;
  duration: number;
  genre: Genre;
  album: Album;
}

export interface SearchRes {
  songs: Array<Song>;
  albums: Array<Album>;
  artists: Array<Artist>;
}
