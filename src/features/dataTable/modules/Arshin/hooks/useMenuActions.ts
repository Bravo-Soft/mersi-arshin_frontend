import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { openFilterDialogArshin } from '../filtersDialogSlice';

import { useAppDispatch } from 'hooks/redux';

export const useMenuActions = () => {
	const dispatch = useAppDispatch();

	const handleOpenFilter = () => {
		dispatch(openFilterDialogArshin());
	};

	const handleSynchronizeItems = (selectedItems: GridSelectionModel) => {
		console.log('Синхронизировать выделенное', selectedItems);
	};

	const handleGetDataFromFgis = () => {
		console.log('Запросить данные из ФГИС');
	};

	const handleDeleteItems = (selectedItems: GridSelectionModel) => {
		console.log('Удалить выделенное', selectedItems);
	};

	return {
		handleOpenFilter,
		handleSynchronizeItems,
		handleGetDataFromFgis,
		handleDeleteItems,
	};
};
