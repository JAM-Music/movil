import {useCallback, useEffect, useMemo, useState} from 'react';
import {ImageURISource} from 'react-native';
import {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  addSongToPlayList,
} from '_src/services/playlist';
import {PlaylistsActions, PlaylistsSelector} from '_src/store/playlists';
import {Playlist} from '_src/utils/types/Playlist';
import {Song} from '_src/utils/types/Songs';
import {useAppDispatch, useAppSelector} from '.';

export function usePlaylists() {
  const state = useAppSelector(PlaylistsSelector);
  const dispatch = useAppDispatch();
  const loading = useMemo(() => state === null, [state]);
  const playlists = useMemo(() => state?.data || [], [state]);

  useEffect(() => {
    getPlaylists()
      .then(res => dispatch(PlaylistsActions.set(res.data)))
      .catch(() => dispatch(PlaylistsActions.set([])));
  }, [dispatch]);

  return {playlists, loading};
}

export function usePlaylist() {
  const dispatch = useAppDispatch();

  const save = useCallback(
    async (playlist: Playlist, file: ImageURISource) => {
      const newPlaylist = await createPlaylist(playlist, file);
      dispatch(PlaylistsActions.add(newPlaylist.data));
    },
    [dispatch],
  );

  return {
    save,
  };
}

export function usePlaylistSongs(id?: string) {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist>({
    title: '',
    image: '',
    songs: [],
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    getPlaylist(id)
      .then(p => setPlaylist(p.data))
      .finally(() => setLoading(false));
  }, [id]);

  const addSong = useCallback(
    async (song: Song) => {
      if (!id || !song._id) {
        return;
      }
      await addSongToPlayList(song._id, id);
      const tempPlaylist = {...playlist};
      tempPlaylist.songs = [...(tempPlaylist.songs || []), song];
      setPlaylist(tempPlaylist);
    },
    [id],
  );

  return {...playlist, loading, addSong};
}
