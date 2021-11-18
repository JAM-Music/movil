import type {RootState} from '_redux';
import {PlaylistsModuleName} from './types';

export function PlaylistsSelector(state: RootState) {
  return state[PlaylistsModuleName];
}
