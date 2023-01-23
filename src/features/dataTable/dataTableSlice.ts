import { createSlice } from '@reduxjs/toolkit';

import type { GridRowId, GridSelectionModel } from '@mui/x-data-grid-pro';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { IField, KeysOfEdit, KeysOfVerificate } from 'components/Forms/fields';
import type { ChipFilterOptions } from './components/Toolbar/components/DataTableToolbarFilter/toolBarFilters';
import type { IDataItem } from 'types/dataItem';

export type AllFormsVisibleColumnsType = {
	modifiedEditFields: IField<KeysOfEdit>[];
	modifiedVerificationFields: IField<KeysOfVerificate>[];
};
export interface IDataTableState {
	selectedDataItem: IDataItem | null;
	filteringOption: ChipFilterOptions;
	selectedModel: GridSelectionModel;
	top: GridRowId[];
	isOpenVerificationSheduleModal: boolean;
	visibleColumns: AllFormsVisibleColumnsType;
}

const initialState: IDataTableState = {
	selectedDataItem: null,
	filteringOption: 'Все',
	selectedModel: [],
	top: [],
	isOpenVerificationSheduleModal: false,
	visibleColumns: {} as AllFormsVisibleColumnsType,
};
const dataTableSlice = createSlice({
	name: 'dataTable',
	initialState,
	reducers: {
		setSelectedDataItem: (state, action: PayloadAction<IDataItem>) => {
			state.selectedDataItem = action.payload;
		},
		changeChipFilterOption: (state, action: PayloadAction<ChipFilterOptions>) => {
			state.filteringOption = action.payload;
		},
		applyNewSelectionModel: (state, action: PayloadAction<GridSelectionModel>) => {
			state.selectedModel = action.payload;
		},
		pinSelectedRow: (state, action: PayloadAction<GridRowId>) => {
			state.top = [...state.top, action.payload];
		},
		pinManyRows: (state, action: PayloadAction<GridRowId[]>) => {
			state.top = [...state.top, ...action.payload];
		},
		unPinRow: (state, action: PayloadAction<GridRowId>) => {
			state.top = state.top.filter(id => id !== action.payload);
		},
		resetSelectedDataItem: state => {
			state.selectedDataItem = initialState.selectedDataItem;
		},
		resetSelectedModel: state => {
			state.selectedModel = initialState.selectedModel;
		},
		unpinManyRows: state => {
			state.top = initialState.top;
		},
		resetDataTableState: () => initialState,
		setVerificationScheduleModal: (state, action: PayloadAction<boolean>) => {
			state.isOpenVerificationSheduleModal = action.payload;
		},
		setActualesColumns: (state, action: PayloadAction<AllFormsVisibleColumnsType>) => {
			state.visibleColumns = action.payload;
		},
	},
});

export const selectedPinnedRows = (state: RootState) => state.dataTable.top;
export const selectSelectedDataItem = (state: RootState) => state.dataTable.selectedDataItem;
export const selectSelectionModel = (state: RootState) => state.dataTable.selectedModel;
export const selectedVisibleColumns = (state: RootState) => state.dataTable.visibleColumns;
export const selectCurrentChipFilterVariant = (state: RootState) => state.dataTable.filteringOption;
export const selectedIsOpenedVerificationScheduleModal = (state: RootState) =>
	state.dataTable.isOpenVerificationSheduleModal;

export const dataTablePath = dataTableSlice.name;
export const dataTableReducer = dataTableSlice.reducer;

export const {
	unPinRow,
	pinManyRows,
	setSelectedDataItem,
	unpinManyRows,
	pinSelectedRow,
	resetSelectedDataItem,
	resetSelectedModel,
	setActualesColumns,
	resetDataTableState,
	applyNewSelectionModel,
	changeChipFilterOption,
	setVerificationScheduleModal,
} = dataTableSlice.actions;
