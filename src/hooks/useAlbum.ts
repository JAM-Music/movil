import {useEffect, useState} from 'react';
import {getSongsByAlbum} from '_src/services/songs';
import {Song} from '_src/utils/types/Songs';

export function useAlbum(id?: string) {
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getSongsByAlbum(id)
      .then(({data}) => setSongs(data))
      .finally(() => setLoading(false));
  }, [id]);

  return {songs, loading};
}
