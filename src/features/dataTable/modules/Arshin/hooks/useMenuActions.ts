import { enqueueSnackbar } from 'notistack';
import { useState, MouseEvent } from 'react';

import { useDeleteItemsMutation, useSynchronizeItemsMutation } from '../arshinTableApiSlice';
import {
	resetSelectedDataItem,
	selectArshinData,
	selectSelectedDataItems,
} from '../arshinTableSlice';
import { changeDialogState, openFilterDialogArshin } from '../dialogArshinSlice';

import { ArshinStatus } from 'constant/arshinStatus';
import { Messages } from 'constant/messages';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useMenuActions = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dataArshin = useAppSelector(selectArshinData);

	const selectedData = useAppSelector(selectSelectedDataItems);

	const [deleteFromArshin] = useDeleteItemsMutation();
	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();

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

	const handleSynchronizeItems = async (selectedIds: string[]) => {
		const selectedData = dataArshin.filter(el => selectedIds.includes(el.id));

		if (selectedData.every(el => el.status === ArshinStatus.DONE)) {
			try {
				await synchronizeItemsArshin(selectedIds);
				enqueueSnackbar(Messages.ARSHIN_ITEM_SUCCESSFULLY_UPDATED, {
					variant: 'success',
				});
			} catch {
				enqueueSnackbar(Messages.FAILED_ARSHIN_ITEM_UPDATED, {
					variant: 'error',
				});
			} finally {
				dispatch(resetSelectedDataItem());
			}
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
		// пока еще не работает
		// checkItemsArshin();
		console.log('Запросить данные из ФГИС');
	};

	const handleDeleteItems = async (selectionIds: string[]) => {
		if (selectedData?.some(el => el.status === ArshinStatus.DONE)) {
			dispatch(
				changeDialogState({
					isOpen: true,
					variant: 'deleting',
					content: `При удалении ${
						selectionIds.length > 1 ? 'данных строк' : 'данной строки'
					} будут потеряны все данные, полученные из ФГИС “Аршин”`,
				})
			);
		} else {
			try {
				await deleteFromArshin(selectionIds).unwrap();
				enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
			} catch {
				enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
			}
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
