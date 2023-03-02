import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IQuickTourSlice {
	step: number;
	startTour: boolean;
}

const initialState: IQuickTourSlice = {
	step: 0,
	startTour: false,
};

const quickTourSlice = createSlice({
	name: 'quickTour',
	initialState,
	reducers: {
		stepHandler: (state, action: PayloadAction<number>) => {
			state.step = action.payload;
		},
		startTourHandler: (state, action: PayloadAction<boolean>) => {
			state.startTour = action.payload;
		},
	},
});

export const selectActualStep = (state: RootState) => state.quickTour.step;
export const selectActualStartTour = (state: RootState) => state.quickTour.startTour;

export const quickTourPath = quickTourSlice.name;
export const quickTourReducer = quickTourSlice.reducer;
export const { stepHandler, startTourHandler } = quickTourSlice.actions;
