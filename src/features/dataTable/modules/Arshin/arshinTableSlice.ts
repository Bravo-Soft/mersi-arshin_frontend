import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { arshinTableApiSlice } from './arshinTableApiSlice';

import { RootState } from 'app/store';
import { ArshinStatus } from 'constant/arshinStatus';
import { IDataItemArshin } from 'types/arshinIntegration';

interface IArshinTableState {
	selectedDataItems: IDataItemArshin[] | null;
}

const initialState: IArshinTableState = {
	selectedDataItems: null,
};

const arshinTableSlice = createSlice({
	name: 'arshinTable',
	initialState,
	reducers: {
		setSelectedDataItems: (state, action: PayloadAction<IDataItemArshin[]>) => {
			state.selectedDataItems = action.payload;
		},
		resetSelectedDataItem: () => initialState,
	},
});

export const selectSelectedDataItems = (state: RootState) => state.arshinTable.selectedDataItems;
export const selectSelectedItemsDone = (state: RootState) =>
	state.arshinTable.selectedDataItems?.filter(el => el.status === ArshinStatus.DONE) ?? [];

export const selectSelectedDataIds = (state: RootState) =>
	state.arshinTable.selectedDataItems?.map(el => el.id) ?? [];

export const selectArshinData = (state: RootState) =>
	arshinTableApiSlice.endpoints.getData.select()(state).data ?? [];

export const { setSelectedDataItems, resetSelectedDataItem } = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
