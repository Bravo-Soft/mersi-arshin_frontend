import { useState, MouseEvent } from 'react';

import { dataArshin } from '../components/DataTableArshin';
import { changeDialogState, openFilterDialogArshin } from '../dialogArshinSlice';

import { ArshinStatus } from 'constant/arshinStatus';
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

	const handleSynchronizeItems = (selectedIds: string[]) => {
		const selectedData = dataArshin.filter(el => selectedIds.includes(el.id));

		if (selectedData.every(el => el.status === ArshinStatus.DONE)) {
			console.log('Обновить выделенное', selectedIds);
		} else {
			const selectedItemsDone = selectedData.filter(el => el.status === ArshinStatus.DONE);

			dispatch(
				changeDialogState({
					isOpen: true,
					variant: 'synchronize',
					content: `Будут обновлены только строки, по которым получены данные с ФГИС “Аршин”, ${selectedItemsDone.length} из ${selectedData.length}`,
				})
			);
		}
	};

	const handleGetDataFromFgis = () => {
		console.log('Запросить данные из ФГИС');
	};

	const handleDeleteItems = (selectedIds: string[]) => {
		// вместо dataArshin получать из кэша данные
		const selectedData = dataArshin.filter(el => selectedIds.includes(el.id));
		if (selectedData.some(el => el.status === ArshinStatus.DONE)) {
			dispatch(
				changeDialogState({
					isOpen: true,
					variant: 'deleting',
					content: `При удалении ${
						selectedIds.length > 1 ? 'данных строк' : 'данной строки'
					} будут потеряны все данные, полученные из ФГИС “Аршин”`,
				})
			);
		} else {
			console.log('Удалить выделенное', selectedIds);
		}
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
