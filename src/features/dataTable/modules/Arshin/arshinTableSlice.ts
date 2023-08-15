import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

interface IArshinTableState {
	selectedDataIds: GridSelectionModel;
}

const initialState: IArshinTableState = {
	selectedDataIds: [],
};

const arshinTableSlice = createSlice({
	name: 'arshinTable',
	initialState,
	reducers: {
		setSelectedDataIds: (state, action: PayloadAction<GridSelectionModel>) => {
			state.selectedDataIds = action.payload;
		},
	},
});

export const selectSelectedDataIds = (state: RootState) => state.arshinTable.selectedDataIds;

export const { setSelectedDataIds } = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
