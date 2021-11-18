import {configureStore} from '@reduxjs/toolkit';
import {PlaylistsReducer, PlaylistsModuleName} from './playlists';
import {UserReducer, UserModuleName} from './user';

export const store = configureStore({
  reducer: {
    [PlaylistsModuleName]: PlaylistsReducer,
    [UserModuleName]: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
