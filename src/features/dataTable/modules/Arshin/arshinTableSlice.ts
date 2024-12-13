import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { arshinTableApiSlice } from './arshinTableApiSlice';

import { RootState } from 'app/store';
import { ArshinStatus } from 'constant/arshinStatus';
import { isValueDefined } from 'guards/isValueDefined';
import {
	ARSHIN_FILTER_TYPE,
	IDataItemArshin,
	INotValidArshinItem,
	IRequestItem,
} from 'types/arshinIntegration';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

interface IArshinTableState {
	selectedDataItem: IDataItemArshin | null;
	selectedDataItems: IDataItemArshin[] | null;
	selectedDataArshinItem: IDataItemArshin | null;
	selectedEditItemIds?: string;
	notValidArshinItem: INotValidArshinItem[];
	notValidArshinClassesItem: INotValidArshinItem[];
	isOpenCreateRequestModal: boolean;
	requestItem: IRequestItem | null;
	pendingRequestItem: Omit<IRequestItem, 'id' | 'status' | 'creator'> | null;
	filterType: ARSHIN_FILTER_TYPE;
}

const initialState: IArshinTableState = {
	selectedDataItem: null,
	selectedDataItems: [],
	selectedDataArshinItem: null,
	notValidArshinItem: [],
	notValidArshinClassesItem: [],
	selectedEditItemIds: '',
	isOpenCreateRequestModal: false,
	requestItem: null,
	pendingRequestItem: null,
	filterType: ARSHIN_FILTER_TYPE.MY_ITEMS,
};

const arshinTableSlice = createSlice({
	name: 'arshinTable',
	initialState,
	reducers: {
		setSelectedDataItem: (state, action: PayloadAction<IDataItemArshin>) => {
			state.selectedDataItem = action.payload;
		},
		setSelectedDataItems: (state, action: PayloadAction<IDataItemArshin[]>) => {
			state.selectedDataItems = action.payload;
		},
		resetSelectedDataItems: state => {
			state.selectedDataItems = initialState.selectedDataItems;
		},
		resetSelectedDataItem: () => initialState,

		setSelectedDataArshinItem: (state, action: PayloadAction<IDataItemArshin>) => {
			state.selectedDataArshinItem = action.payload;
		},
		setNotValidArshinItem: (state, action: PayloadAction<INotValidArshinItem[]>) => {
			state.notValidArshinItem = action.payload;
			state.notValidArshinClassesItem = action.payload;
		},
		deleteNotValidArshinItem: (state, action: PayloadAction<string>) => {
			state.notValidArshinClassesItem = state.notValidArshinClassesItem.filter(
				({ originId }) => originId !== action.payload
			);
		},
		resetSelectedDataArshinItem: state => {
			state.selectedDataArshinItem = initialState.selectedDataArshinItem;
		},
		setSelectedEditItemIds: (state, action: PayloadAction<string>) => {
			state.selectedEditItemIds = action.payload;
		},
		resetSelectedEditItemIds: state => {
			state.selectedEditItemIds = initialState.selectedEditItemIds;
		},
		setCreateRequestModal: (state, action: PayloadAction<boolean>) => {
			state.isOpenCreateRequestModal = action.payload;
		},

		setRequest: (state, action: PayloadAction<IRequestItem | null>) => {
			state.requestItem = action.payload;
		},

		setRequestDataIds: (state, action: PayloadAction<IDataItemArshin[] | string[]>) => {
			if (state.requestItem) {
				state.requestItem.dataIds = action.payload;
			}
		},
		setPendingRequest: (
			state,
			action: PayloadAction<Omit<IRequestItem, 'id' | 'status' | 'creator'> | null>
		) => {
			state.pendingRequestItem = action.payload;
		},
		resetPendingRequest: state => {
			state.pendingRequestItem = initialState.pendingRequestItem;
		},
		setPendingRequestDataIds: (state, action: PayloadAction<string[]>) => {
			if (state.pendingRequestItem) {
				state.pendingRequestItem.dataIds = action.payload;
			}
		},
		setFilterType: (state, action: PayloadAction<ARSHIN_FILTER_TYPE>) => {
			state.filterType = action.payload;
		},
	},
});

export const selectRequest = (state: RootState) => state.arshinTable.requestItem;
export const selectPendingRequestItem = (state: RootState) => state.arshinTable.pendingRequestItem;
export const selectRequestDataIds = (state: RootState) => state.arshinTable.requestItem?.dataIds;
//Selected model (Модель выбора)
export const selectSelectedDataItem = (state: RootState) =>
	state.arshinTable.selectedDataItem ?? null;
export const selectSelectedDataItems = (state: RootState) =>
	state.arshinTable.selectedDataItems ?? [];

//Id items in a selected  model (массив id каждого элемента модели)
export const selectSelectedDataIds = (state: RootState) =>
	state.arshinTable.selectedDataItems?.map(el => el.id) ?? [];

//Arshin all data (все позиции для аршин)
export const selectArshinData = (state: RootState) =>
	arshinTableApiSlice.endpoints.getGroupData.select()(state).data ?? [];

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

//Массива данных из таблицы по выделенным id без наведенного элемента
export const selectSelectedModelArshinNotSelectedItem = (state: RootState) => {
	const selectedModel = selectSelectedDataIds(state);
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
	const model = selectSelectedModelArshinNotSelectedItem(state);
	return model.filter(
		({ status }) => status !== ArshinStatus.DONE && status !== ArshinStatus.PROCESS
	);
};

//Модель id  для отправки
export const selectUploadModelIds = (state: RootState) => {
	const uploadModel = selectUploadModel(state);
	return uploadModel.map(({ id }) => id);
};

// ---
export const selectNotValidArshinItem = (state: RootState) => state.arshinTable.notValidArshinItem;

//--
export const selectSelectedEditItemIds = (state: RootState) =>
	state.arshinTable.selectedEditItemIds;

export const selectNotValidArshinClassesItem = (state: RootState) =>
	state.arshinTable.notValidArshinClassesItem;

export const selectIsOpenCreateRequestModal = (state: RootState) =>
	state.arshinTable.isOpenCreateRequestModal;

//--
export const selectFilterType = (state: RootState) => state.arshinTable.filterType;

export const {
	setSelectedDataItem,
	setSelectedDataItems,
	resetSelectedDataItem,
	resetSelectedDataItems,
	setNotValidArshinItem,
	setSelectedDataArshinItem,
	resetSelectedDataArshinItem,
	resetSelectedEditItemIds,
	setSelectedEditItemIds,
	deleteNotValidArshinItem,
	setCreateRequestModal,
	setRequest,
	setRequestDataIds,
	setPendingRequest,
	setPendingRequestDataIds,
	resetPendingRequest,
	setFilterType,
} = arshinTableSlice.actions;

export const arshinTablePath = arshinTableSlice.name;
export const arshinTableReducer = arshinTableSlice.reducer;
