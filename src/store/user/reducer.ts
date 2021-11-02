import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface State {
  data: any;
}

const initialState: State = {
  data: undefined,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.data = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
