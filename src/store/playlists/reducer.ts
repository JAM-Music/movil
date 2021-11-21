import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Playlist} from '_src/utils/types/Playlist';
import {Song} from '_src/utils/types/Songs';

interface State {
  data: Array<Playlist> | null;
}

const initialState: State = {
  data: null,
};

export const PlaylistsSlice = createSlice({
  name: 'Playlists',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Array<Playlist>>) => {
      state.data = action.payload;
    },
    add: (state, action: PayloadAction<Playlist>) => {
      state.data?.push(action.payload);
    },
    update: (state, action: PayloadAction<Playlist>) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        playlist => playlist._id === action.payload._id,
      );
      if (index > -1) {
        const playlists = [...state.data];
        playlists[index] = action.payload;
        state.data = playlists;
      }
    },
    delete: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        playlist => playlist._id === action.payload,
      );
      if (index > -1) {
        const playlist = [...state.data];
        playlist.splice(index, 1);
        state.data = playlist;
      }
    },
    setSongs: (
      state,
      action: PayloadAction<{_id: string; songs: Array<Song>}>,
    ) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        playlist => playlist._id === action.payload._id,
      );
      if (index > -1) {
        const playlists = [...state.data];
        playlists[index].songs = action.payload.songs;
        state.data = playlists;
      }
    },
    addSong: (state, action: PayloadAction<{_id: string; song: Song}>) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        playlist => playlist._id === action.payload._id,
      );
      if (index > -1) {
        const playlists = [...state.data];
        const playlist = {...playlists[index]};
        const songs = [...(playlist.songs || [])];
        songs.push(action.payload.song);
        playlist.songs = songs;
        playlists[index] = playlist;
        state.data = playlists;
      }
    },
    removeSong: (state, action: PayloadAction<{_id: string; song: string}>) => {
      if (!state.data) return;
      const index = state.data.findIndex(
        playlist => playlist._id === action.payload._id,
      );
      if (index < 0) return;
      const playlists = [...state.data];
      const playlist = {...playlists[index]};
      if (!playlist.songs) return;
      const songs = [...playlist.songs];
      const songIndex = songs.findIndex(
        song => song._id === action.payload.song,
      );
      if (songIndex < 0) return;
      songs.splice(songIndex, 1);
      playlist.songs = songs;
      playlists[index] = playlist;
      state.data = playlists;
    },
  },
});

export const PlaylistsActions = PlaylistsSlice.actions;
export const PlaylistsReducer = PlaylistsSlice.reducer;
