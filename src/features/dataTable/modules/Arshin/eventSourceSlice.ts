import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface IEventSourceState {
	processed: number;
	total: number;
	isStart: boolean;
	isAlive: boolean;
}

const initialState: IEventSourceState = {
	processed: 0,
	total: 0,
	isStart: false,
	isAlive: true,
};

const eventSource = createSlice({
	name: 'eventSource',
	initialState,
	reducers: {
		setEventSourceData: (state, action: PayloadAction<IEventSourceState>) => {
			state.processed = action.payload.processed;
			state.total = action.payload.total;
			state.isAlive = action.payload.isAlive;
			state.isStart = action.payload.isStart;
		},
		setStartProcess: (state, action: PayloadAction<boolean>) => {
			state.isStart = action.payload;
		},
		resetState: () => initialState,
	},
});

export const selectProgressArshin = (state: RootState) => {
	const { processed, total } = state.eventSource;
	if (processed === total) {
		return 0;
	}
	return 100 - (processed / total) * 100;
};

export const selectIsStartArshin = (state: RootState) => state.eventSource.isStart;
export const selectIsAliveArshin = (state: RootState) => state.eventSource.isAlive;

export const selectProcess = (state: RootState) => {
	const { processed, total } = state.eventSource;

	return { processed, total };
};
export const { resetState, setEventSourceData, setStartProcess } = eventSource.actions;
export const eventSourcePath = eventSource.name;
export const eventSourceReducer = eventSource.reducer;
