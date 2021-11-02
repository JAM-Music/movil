import type {RootState} from '_redux';
import {UserModuleName} from './types';

export function UserSelector(state: RootState) {
  return state[UserModuleName];
}
