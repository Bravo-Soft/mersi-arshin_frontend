import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';
import type { PayloadAction } from '@reduxjs/toolkit';

/*
slice для хранения состояние тура

	step: активный шаг
	startTour: активность тура
	startIsMenu: активен ли тур из меню
	
*/

interface IQuickTourSlice {
	step: number;
	startTour: boolean;
	startIsMenu: boolean;
}

const initialState: IQuickTourSlice = {
	step: 0,
	startTour: false,
	startIsMenu: false,
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
		menuStartTour: (state, action: PayloadAction<boolean>) => {
			state.startIsMenu = action.payload;
		},
	},
});

export const selectActualStep = (state: RootState) => state.quickTour.step;
export const selectActualStartTour = (state: RootState) => state.quickTour.startTour;
export const selectMenuStart = (state: RootState) => state.quickTour.startIsMenu;

export const quickTourPath = quickTourSlice.name;
export const quickTourReducer = quickTourSlice.reducer;
export const { stepHandler, startTourHandler, menuStartTour } = quickTourSlice.actions;
