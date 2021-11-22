import {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, ImageURISource} from 'react-native';
import {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  addSongToPlayList,
  removeSongFromPlayList,
} from '_src/services/playlist';

import {getPlaySong} from '_src/services/songs';

export function useSongs() {
  const [loading, setLoading] = useState(true);

  const getSong = useCallback(async (id: string) => {
    if (!id) return;
    const musicTemp = await getPlaySong(id);
    return musicTemp;
  }, []);

  return {loading, getSong};
}
