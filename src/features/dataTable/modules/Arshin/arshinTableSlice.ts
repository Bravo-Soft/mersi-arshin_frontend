import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { arshinTableApiSlice } from './arshinTableApiSlice';

import { RootState } from 'app/store';
import { ArshinStatus } from 'constant/arshinStatus';
import { IDataItemArshin } from 'types/arshinIntegration';

interface IArshinTableState {
	selectedDataItems: IDataItemArshin[] | null;
	selectedDataArshinItem: string | null;
}

const initialState: IArshinTableState = {
	selectedDataItems: null,
	selectedDataArshinItem: null,
};

const arshinTableSlice = createSlice({
	name: 'arshinTable',
	initialState,
	reducers: {
		setSelectedDataItems: (state, action: PayloadAction<IDataItemArshin[]>) => {
			state.selectedDataItems = action.payload;
		},
		resetSelectedDataItem: () => initialState,

		setSelectedDataArshinItem: (state, action: PayloadAction<string>) => {
			state.selectedDataArshinItem = action.payload;
		},

		resetSelectedDataArshinItem: state => {
			state.selectedDataArshinItem = initialState.selectedDataArshinItem;
		},
	},
});

export const selectSelectedDataItems = (state: RootState) => state.arshinTable.selectedDataItems;
export const selectSelectedItemsDone = (state: RootState) =>
	state.arshinTable.selectedDataItems?.filter(el => el.status === ArshinStatus.DONE) ?? [];

export const selectSelectedDataIds = (state: RootState) =>
	state.arshinTable.selectedDataItems?.map(el => el.id) ?? [];

export const selectArshinData = (state: RootState) =>
	arshinTableApiSlice.endpoints.getData.select()(state).data ?? [];

export const selectSelectedArshinData = (state: RootState) =>
	state.arshinTable.selectedDataArshinItem;

export const { setSelectedDataItems, resetSelectedDataItem, setSelectedDataArshinItem } =
	arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
