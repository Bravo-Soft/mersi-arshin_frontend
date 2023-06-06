import { createSlice } from '@reduxjs/toolkit';
import { authApiSlice } from './authApiSlice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { IAuthResponse } from './authApiSlice';

interface IAuthState {
	token: string | null;
}

const initialState: IAuthState = {
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentionals: (state, action: PayloadAction<IAuthResponse>) => {
			state.token = action.payload.accessToken;
		},
		resetCredentionals: () => initialState,
	},
	extraReducers(builder) {
		builder.addMatcher(authApiSlice.endpoints.initSession.matchFulfilled, (state, action) => {
			state.token = action.payload.accessToken;
		});
	},
});

export const selectToken = (state: RootState) => state.auth.token;

export const { setCredentionals, resetCredentionals } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authPath = authSlice.name;
