import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';

export interface IHistoryTableState {
	isOpenHistoryRow: boolean;
	historyRowId: string;
}

const initialState: IHistoryTableState = {
	isOpenHistoryRow: false,
	historyRowId: '',
};
const historyTableSlice = createSlice({
	name: 'historyTable',
	initialState,
	reducers: {
		setOpenHistoryRow: (state, action: PayloadAction<boolean>) => {
			state.isOpenHistoryRow = action.payload;
		},
		setHistoryRowId: (state, action: PayloadAction<string>) => {
			state.historyRowId = action.payload;
		},
	},
});

export const selectisOpenHistoryRow = (state: RootState) => state.historyTable.isOpenHistoryRow;
export const selectHistoryRowId = (state: RootState) => state.historyTable.historyRowId;

export const historyTablePath = historyTableSlice.name;
export const historyTableReducer = historyTableSlice.reducer;

export const { setOpenHistoryRow, setHistoryRowId } = historyTableSlice.actions;
