import {useCallback, useEffect, useMemo} from 'react';
import {Alert, ImageURISource} from 'react-native';
import {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  addSongToPlayList,
  updatePlaylist,
  removePlaylist,
  removeSongFromPlayList,
} from '_src/services/playlist';
import {
  PlaylistsActions,
  PlaylistSelector,
  PlaylistsSelector,
} from '_src/store/playlists';
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
    async (playlist: Playlist, file?: ImageURISource) => {
      if (playlist._id) {
        await updatePlaylist(playlist, file);
        dispatch(PlaylistsActions.update(playlist));
        return;
      }
      if (!file) return;
      const newPlaylist = await createPlaylist(playlist, file);
      dispatch(PlaylistsActions.add(newPlaylist.data));
    },
    [dispatch],
  );

  const remove = useCallback(
    async (_id: string) => {
      await removePlaylist(_id);
      dispatch(PlaylistsActions.delete(_id));
    },
    [dispatch],
  );
  return {
    save,
    remove,
  };
}

export function usePlaylistSongs(id?: string) {
  const playlist = useAppSelector(state => PlaylistSelector(state, id));
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async (_id?: string) => {
      if (!_id) {
        return;
      }
      return getPlaylist(_id).then(p =>
        dispatch(PlaylistsActions.setSongs({_id, songs: p.data.songs || []})),
      );
    },
    [dispatch],
  );

  const addSong = useCallback(
    async (song: Song) => {
      if (!id || !song._id) return;
      if (playlist.songs?.find(s => s._id === song._id)) {
        Alert.alert('', 'La canción ya se encuentra en la playlist');
        return;
      }
      addSongToPlayList(song._id, id);
      dispatch(PlaylistsActions.addSong({_id: id, song}));
    },
    [id, dispatch, playlist.songs],
  );

  const removeSong = useCallback(
    async (song: Song) => {
      if (!id || !song._id) return;
      removeSongFromPlayList(song._id, id);
      dispatch(PlaylistsActions.removeSong({_id: id, song: song._id}));
    },
    [id, dispatch],
  );

  return {addSong, removeSong, playlist, fetchData};
}
