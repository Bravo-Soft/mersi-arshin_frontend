import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

const initialState = {
	open: false,
};

export const filterDialogSlice = createSlice({
	name: 'filterDialog',
	initialState,
	reducers: {
		openFilterDialogArshin: state => {
			state.open = true;
		},
		closeFilterDialogArshin: state => {
			state.open = false;
		},
	},
});

export const { openFilterDialogArshin, closeFilterDialogArshin } = filterDialogSlice.actions;

export const selectOpenFilterDialogArshin = (state: RootState) => state.filterDialog.open;

export const filterDialogArshinPath = filterDialogSlice.name;

export const filterDialogArshinReducer = filterDialogSlice.reducer;
