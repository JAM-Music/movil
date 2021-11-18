import {useEffect, useState} from 'react';
import {getAlbumsByArtist} from '_src/services/albums';
import {getSongsByArtist} from '_src/services/songs';
import {Album, Song} from '_src/utils/types/Songs';

async function fetchData(id: string) {
  return Promise.all([getAlbumsByArtist(id), getSongsByArtist(id)]);
}

export function useArtist(id: string | undefined) {
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData(id)
      .then(([_albums, _songs]) => {
        setAlbums(_albums.data);
        setSongs(_songs.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return {loading, songs, albums};
}
