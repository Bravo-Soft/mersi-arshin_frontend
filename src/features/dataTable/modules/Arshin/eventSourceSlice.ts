import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface IEventSourceState {
	current: number;
	total: number;
}

const initialState: IEventSourceState = {
	current: 0,
	total: 0,
};

const eventSource = createSlice({
	name: 'eventSource',
	initialState,
	reducers: {
		setEventSourceData: (state, action: PayloadAction<IEventSourceState>) => {
			state.current = action.payload.current;
			state.total = action.payload.total;
		},
		resetState: () => initialState,
	},
});

export const selectProgressArshin = (state: RootState) =>
	(state.eventSource.current / state.eventSource.total) * 100;

export const selectBtnVariant = (state: RootState) =>
	state.eventSource.current === 0 && state.eventSource.total === 0;

export const { resetState, setEventSourceData } = eventSource.actions;
export const eventSourcePatch = eventSource.name;
export const eventSourceReducer = eventSource.reducer;
