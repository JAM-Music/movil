import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Playlist} from '_src/utils/types/Playlist';

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
      state.data = [...(state.data || []), action.payload];
    },
  },
});

export const PlaylistsActions = PlaylistsSlice.actions;
export const PlaylistsReducer = PlaylistsSlice.reducer;
