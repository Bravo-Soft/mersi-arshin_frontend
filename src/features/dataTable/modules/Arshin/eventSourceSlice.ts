import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface IEventSourceState {
	processed: number;
	total: number;
	isStart: boolean;
}

const initialState: IEventSourceState = {
	processed: 0,
	total: 0,
	isStart: false,
};

const eventSource = createSlice({
	name: 'eventSource',
	initialState,
	reducers: {
		setEventSourceData: (state, action: PayloadAction<Omit<IEventSourceState, 'isStart'>>) => {
			state.processed = action.payload.processed;
			state.total = action.payload.total;
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

export const selectProcess = (state: RootState) => {
	const { processed, total } = state.eventSource;

	return { processed, total };
};
export const { resetState, setEventSourceData, setStartProcess } = eventSource.actions;
export const eventSourcePatch = eventSource.name;
export const eventSourceReducer = eventSource.reducer;
