import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TUser = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type TInitialState = {
  user: TUser | null;
  accessToken: string | null;
};

const initialState: TInitialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
