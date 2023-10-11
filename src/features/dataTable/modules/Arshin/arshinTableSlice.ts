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

export const {
	setSelectedDataItems,
	resetSelectedDataItem,
	setSelectedDataArshinItem,
	resetSelectedDataArshinItem,
} = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
