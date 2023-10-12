import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arshinTableApiSlice } from './arshinTableApiSlice';

import { RootState } from 'app/store';
import { ArshinStatus } from 'constant/arshinStatus';
import { isValueDefined } from 'guards/isValueDefined';
import { IDataItemArshin } from 'types/arshinIntegration';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

interface IArshinTableState {
	selectedDataItems: IDataItemArshin[] | null;
	selectedDataArshinItem: IDataItemArshin | null;
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

		setSelectedDataArshinItem: (state, action: PayloadAction<IDataItemArshin>) => {
			state.selectedDataArshinItem = action.payload;
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

//--- ids по статусу

//Массив всех id  аршина в таблице которые не содержат is Done
export const selectNotIsDoneArshin = (state: RootState) => {
	const data = selectArshinData(state);
	return data.filter(({ status }) => status !== ArshinStatus.DONE).map(({ id }) => id);
};
//Массив всех id  аршина в таблице которые  содержат is Done
export const selectTableDoneArshin = (state: RootState) => {
	const data = selectArshinData(state);
	return data.filter(({ status }) => status === ArshinStatus.DONE).map(({ id }) => id);
};
//Массив всех id  аршина в таблице которые не содержат is AWAITING_SHIPMENT
export const selectAwaitingShipmentArshin = (state: RootState) => {
	const data = selectArshinData(state);
	return data
		.filter(({ status }) => status !== ArshinStatus.AWAITING_SHIPMENT)
		.map(({ id }) => id);
};

//--- Массив выделенных элементов  по статусу

// статус выполнен
export const selectSelectedItemsDone = (state: RootState) => {
	const selectedModelById = selectSelectedModelArshin(state);
	return selectedModelById?.filter(({ status }) => status === ArshinStatus.DONE);
};
// статус AWAITING_SHIPMENT
export const selectSelectedAwaitingShipment = (state: RootState) => {
	const selectedModelById = selectSelectedModelArshin(state);
	return selectedModelById?.filter(({ status }) => status === ArshinStatus.AWAITING_SHIPMENT);
};

//---  ids по статусу

//isDone
export const selectIdsIsDone = (state: RootState) => {
	const doneItems = selectSelectedItemsDone(state);
	return doneItems.map(({ id }) => id);
};

//AWAITING_SHIPMENT
export const selectSelectedAwaitingShipmentIds = (state: RootState) => {
	const awaitingShipment = selectSelectedAwaitingShipment(state);
	return awaitingShipment.map(({ id }) => id);
};

//--- every
//все данные массивы idDone
export const selectIsDone = (state: RootState) => {
	const doneItems = selectSelectedModelArshin(state);
	return doneItems.every(({ status }) => status === ArshinStatus.DONE);
};
//Все данные в таблице idDone
export const selectTableIsDone = (state: RootState) => {
	const data = selectArshinData(state);
	return data?.filter(({ status }) => status === ArshinStatus.DONE).map(({ id }) => id);
};
//все данные массивы не содержат idDone
export const selectNotIsDone = (state: RootState) => {
	const doneItems = selectSelectedModelArshin(state);
	return doneItems.every(({ status }) => status !== ArshinStatus.DONE);
};

//Массив данных модели которые можно отправить на проверку

export const selectSendingModel = (state: RootState) => {
	const model = selectSelectedModelArshin(state);
	return model.filter(
		({ status }) =>
			status === ArshinStatus.AWAITING_SHIPMENT ||
			status === ArshinStatus.FAILED_TO_RETRIEVE_DATA
	);
};

//--- new Model-----------

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
export const selectSynchronizeModel = (state: RootState) => {
	const model = selectSelectedModelArshin(state);
	return model.filter(({ status }) => status === ArshinStatus.DONE);
};

//Модель id  для синхронизации
export const selectSynchronizeModelIds = (state: RootState) => {
	const synchronizeModel = selectDeleteModel(state);
	return synchronizeModel.map(({ id }) => id);
};

//Все данные таблицы для синхронизации
export const selectSynchronizeAllItemsModel = (state: RootState) => {
	const data = selectArshinData(state);
	return data.filter(({ status }) => status === ArshinStatus.DONE);
};

//Все id таблицы для синхронизации
export const selectSynchronizeAllItemsModelIds = (state: RootState) => {
	const synchronizeAllItemsModel = selectSynchronizeAllItemsModel(state);
	return synchronizeAllItemsModel.map(({ id }) => id);
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

export const {
	setSelectedDataItems,
	resetSelectedDataItem,
	setSelectedDataArshinItem,
	resetSelectedDataArshinItem,
} = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
