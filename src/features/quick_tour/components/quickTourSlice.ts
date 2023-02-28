import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IQuickTourSlice {
	step: number;
}

const initialState: IQuickTourSlice = {
	step: 0,
};

const quickTourSlice = createSlice({
	name: 'quickTour',
	initialState,
	reducers: {
		stepHandler: (state, action: PayloadAction<number>) => {
			state.step = state.step + action.payload;
		},
	},
});

export const selectActualStep = (state: RootState) => state.quickTour.step;

export const quickTourPath = quickTourSlice.name;
export const quickTourReducer = quickTourSlice.reducer;
export const { stepHandler } = quickTourSlice.actions;
