import { enqueueSnackbar } from 'notistack';
import { useState, MouseEvent } from 'react';

import { useDeleteItemsMutation, useSynchronizeItemsMutation } from '../arshinTableApiSlice';
import {
	resetSelectedDataItem,
	selectArshinData,
	selectSelectedArshinData,
	selectSelectedDataItems,
} from '../arshinTableSlice';
import { changeDialogState, openFilterDialogArshin } from '../dialogArshinSlice';

import useTableActions from './useTableActions';

import { ArshinStatus } from 'constant/arshinStatus';
import { Messages } from 'constant/messages';
import { isValueDefined } from 'guards/isValueDefined';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getArrayWithoutDuplicates } from 'utils/getArrayWithoutDuplicates';

export const useMenuActions = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const dataArshin = useAppSelector(selectArshinData);

	const selectedData = useAppSelector(selectSelectedDataItems);
	const selectedDataArshin = useAppSelector(selectSelectedArshinData);

	const [deleteFromArshin] = useDeleteItemsMutation();
	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();

	const { selectionIds } = useTableActions();

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

	const handleDeleteItems = async () => {
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
				await deleteFromArshin(
					isValueDefined(selectedDataArshin)
						? getArrayWithoutDuplicates(...selectionIds, selectedDataArshin)
						: selectionIds
				).unwrap();
				enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
			} catch {
				enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
			}
		}
	};
	selectedDataArshin;
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
