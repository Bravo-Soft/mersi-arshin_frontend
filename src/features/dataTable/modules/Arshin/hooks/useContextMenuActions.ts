import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { useState } from 'react';
import type { MouseEvent } from 'react';

import { openFilterDialogArshin } from '../filtersDialogSlice';

import { ICoordinates } from 'features/dataTable/hooks/useContextMenuActions';
import { useAppDispatch } from 'hooks/redux';

export const useContextMenuActions = () => {
	const dispatch = useAppDispatch();
	const [contextMenu, setContextMenu] = useState<ICoordinates | null>(null);

	const handleClose = () => {
		setContextMenu(null);
	};

	const handleOpenContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null
		);
	};

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
		contextMenu,
		handleClose,
		handleOpenContextMenu,
		handleOpenFilter,
		handleSynchronizeItems,
		handleGetDataFromFgis,
		handleDeleteItems,
	};
};
