import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface IEventSourceState {
	isWorking: boolean;
}

const initialState: IEventSourceState = {
	isWorking: false,
};

const eventSource = createSlice({
	name: 'eventSource',
	initialState,
	reducers: {
		setEventSourceData: (state, action: PayloadAction<IEventSourceState>) => {
			state.isWorking = action.payload.isWorking;
		},
		resetState: () => initialState,
	},
});

export const selectIsWorkingArshin = (state: RootState) => state.eventSource.isWorking;

export const { resetState, setEventSourceData } = eventSource.actions;
export const eventSourcePath = eventSource.name;
export const eventSourceReducer = eventSource.reducer;
