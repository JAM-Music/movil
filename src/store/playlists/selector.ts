import type {RootState} from '_redux';
import {Playlist} from '_src/utils/types/Playlist';
import {PlaylistsModuleName} from './types';

export function PlaylistsSelector(state: RootState) {
  return state[PlaylistsModuleName];
}

export function PlaylistSelector(state: RootState, id?: string): Playlist {
  return (
    state[PlaylistsModuleName].data?.find(playlist => playlist._id === id) || {
      title: '',
      image: '',
    }
  );
}
