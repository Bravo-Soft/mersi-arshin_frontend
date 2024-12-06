import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'app/store';

export interface IHistoryTableState {
	selectedId: string | null;
	isOpenHistoryRow: boolean;
	historyRowId: string;
}

const initialState: IHistoryTableState = {
	selectedId: null,
	isOpenHistoryRow: false,
	historyRowId: '',
};
const historyTableSlice = createSlice({
	name: 'historyTable',
	initialState,
	reducers: {
		setSelectedId: (state, action: PayloadAction<string>) => {
			state.selectedId = action.payload;
		},
		setOpenHistoryRow: (state, action: PayloadAction<boolean>) => {
			state.isOpenHistoryRow = action.payload;
		},
		setHistoryRowId: (state, action: PayloadAction<string>) => {
			state.historyRowId = action.payload;
		},
	},
});

export const selectSelectedId = (state: RootState) => state.historyTable.selectedId;
export const selectisOpenHistoryRow = (state: RootState) => state.historyTable.isOpenHistoryRow;
export const selectHistoryRowId = (state: RootState) => state.historyTable.historyRowId;

export const historyTablePath = historyTableSlice.name;
export const historyTableReducer = historyTableSlice.reducer;

export const { setSelectedId, setOpenHistoryRow, setHistoryRowId } = historyTableSlice.actions;
