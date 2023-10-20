import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arshinTableApiSlice } from './arshinTableApiSlice';

import { RootState } from 'app/store';
import { ArshinStatus } from 'constant/arshinStatus';
import { isValueDefined } from 'guards/isValueDefined';
import { IDataItemArshin, INotValidArshinItem } from 'types/arshinIntegration';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

interface IArshinTableState {
	selectedDataItems: IDataItemArshin[] | null;
	selectedDataArshinItem: IDataItemArshin | null;
	notValidArshinItem: INotValidArshinItem[];
}

const initialState: IArshinTableState = {
	selectedDataItems: [],
	selectedDataArshinItem: null,
	notValidArshinItem: [],
};

const arshinTableSlice = createSlice({
	name: 'arshinTable',
	initialState,
	reducers: {
		setSelectedDataItems: (state, action: PayloadAction<IDataItemArshin[]>) => {
			state.selectedDataItems = action.payload;
		},

		resetSelectedDataItem: () => initialState,

		setSelectedDataArshinItem: (state, action: PayloadAction<IDataItemArshin>) => {
			state.selectedDataArshinItem = action.payload;
		},
		setNotValidArshinItem: (state, action: PayloadAction<any>) => {
			state.notValidArshinItem = action.payload;
		},
		resetSelectedDataArshinItem: state => {
			state.selectedDataArshinItem = initialState.selectedDataArshinItem;
		},
	},
});

//Selected model (Модель выбора)
export const selectSelectedDataItems = (state: RootState) =>
	state.arshinTable.selectedDataItems ?? [];

//Id items in a selected  model (массив id каждого элемента модели)
export const selectSelectedDataIds = (state: RootState) =>
	state.arshinTable.selectedDataItems?.map(el => el.id) ?? [];

//Arshin all data (все позиции для аршин)
export const selectArshinData = (state: RootState) =>
	arshinTableApiSlice.endpoints.getData.select()(state).data ?? [];

//hovered element id (айди элемента на котором курсор наведен)
export const selectSelectedArshinData = (state: RootState) =>
	state.arshinTable.selectedDataArshinItem;

//model array ids and hovered element id (модель выбранных айдишников и айди наведенного элемента)
export const selectSelectedArshin = (state: RootState) => {
	const selectedItem = selectSelectedArshinData(state);
	const selectedIds = selectSelectedDataIds(state);
	return isValueDefined(selectedItem)
		? getArrayWithoutDuplicates(...selectedIds, selectedItem.id)
		: selectedIds;
};

//Массива данных из таблицы по выделенным id
export const selectSelectedModelArshin = (state: RootState) => {
	const selectedModel = selectSelectedArshin(state);
	const data = selectArshinData(state);
	return data.filter(({ id }) => selectedModel.includes(id));
};

//---- Модель данных для удаления данных

//Модель для удаления
export const selectDeleteModel = (state: RootState) => {
	const model = selectSelectedModelArshin(state);
	return model.filter(({ status }) => status !== ArshinStatus.PROCESS);
};

//Модель id  для удаления
export const selectDeleteModelIds = (state: RootState) => {
	const deleteModel = selectDeleteModel(state);
	return deleteModel.map(({ id }) => id);
};

//---- Модель данных для синхронизации данных

//Модель для синхронизации
export const selectModelSynchronize = (state: RootState) => {
	const model = selectSelectedModelArshin(state);
	return model.filter(({ status }) => status === ArshinStatus.DONE);
};

//Модель id  для синхронизации
export const selectModelSynchronizeIds = (state: RootState) => {
	const synchronizeModel = selectModelSynchronize(state);
	return synchronizeModel.map(({ id }) => id);
};

//Все данные таблицы для синхронизации
export const selectSynchronize = (state: RootState) => {
	const data = selectArshinData(state);
	return data.filter(({ status }) => status === ArshinStatus.DONE);
};

//Все id таблицы для синхронизации
export const selectSynchronizeIds = (state: RootState) => {
	const synchronizeAllItemsModel = selectSynchronize(state);
	return synchronizeAllItemsModel.map(({ id }) => id);
};

//Условие открытия диалога синхронизации
export const selectIsOpenSynchronizeDialog = (state: RootState) => {
	const doneItems = selectSelectedModelArshin(state);
	return doneItems.every(({ status }) => status === ArshinStatus.DONE);
};

//---- Модель данных для отправки данных

//Модель для отправки
export const selectUploadModel = (state: RootState) => {
	const model = selectSelectedModelArshin(state);
	return model.filter(
		({ status }) => status !== ArshinStatus.DONE && status !== ArshinStatus.PROCESS
	);
};

//Модель id  для отправки
export const selectUploadModelIds = (state: RootState) => {
	const uploadModel = selectDeleteModel(state);
	return uploadModel.map(({ id }) => id);
};

// ---
export const selectNotValidArshinItem = (state: RootState) => state.arshinTable.notValidArshinItem;

export const {
	setSelectedDataItems,
	resetSelectedDataItem,
	setNotValidArshinItem,
	setSelectedDataArshinItem,
	resetSelectedDataArshinItem,
} = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
