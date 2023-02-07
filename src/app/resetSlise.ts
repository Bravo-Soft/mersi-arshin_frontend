import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 1 };

const resetSlise = createSlice({
	name: 'reset',
	initialState,
	reducers: {
		clearStore: () => {},
	},
});

export const { clearStore } = resetSlise.actions;
export const resetReducer = resetSlise.reducer;
export const resetPath = resetSlise.name;
