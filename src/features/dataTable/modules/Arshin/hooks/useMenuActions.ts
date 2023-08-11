import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { useState, MouseEvent } from 'react';

import { openFilterDialogArshin } from '../filtersDialogSlice';

import { useAppDispatch } from 'hooks/redux';

export const useMenuActions = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};
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
		anchorEl,
		open,
		handleOpenMenu,
		handleCloseMenu,
		handleOpenFilter,
		handleSynchronizeItems,
		handleGetDataFromFgis,
		handleDeleteItems,
	};
};
