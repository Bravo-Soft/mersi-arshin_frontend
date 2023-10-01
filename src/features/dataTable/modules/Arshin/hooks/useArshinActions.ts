import { enqueueSnackbar } from 'notistack';

import { useDeleteItemsMutation, useSynchronizeItemsMutation } from '../arshinTableApiSlice';
import {
	resetSelectedDataItem,
	selectIdsIsDone,
	selectIsDone,
	selectNotIsDone,
	selectSelectedArshin,
	selectSelectedDataIds,
	selectSelectedDataItems,
	selectSelectedModelArshin,
} from '../arshinTableSlice';
import { DialogVariants, changeDialogState, selectIsOpenDialog } from '../dialogArshinSlice';

import { Messages } from 'constant/messages';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useArshinActions = () => {
	const dispatch = useAppDispatch();
	const [deleteFromArshin] = useDeleteItemsMutation();
	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();

	const { isOpen } = useAppSelector(selectIsOpenDialog);

	//Массив id выделенной модели
	const selectionIds = useAppSelector(selectSelectedDataIds);

	//Выделенная модель
	const selectedData = useAppSelector(selectSelectedDataItems);

	//Массив id позиций (модель + выбранная позиция вне модели)
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	//Массива данных из таблицы по выделенным id
	const selectedFullModelArshin = useAppSelector(selectSelectedModelArshin);

	//массив id позиций которые имеют статус DONE
	const arshinIdIsDone = useAppSelector(selectIdsIsDone);

	//все данные массивы не содержат idDone
	const doesNotContainIsDone = useAppSelector(selectNotIsDone);

	//все данные массивы не содержат idDone
	const containIsDone = useAppSelector(selectIsDone);

	const dataLength = arshinIdIsDone.length < selectedFullModelArshin.length;

	const handleSynchronizeItems = async () => {
		if (dataLength && !isOpen && !containIsDone) {
			return handleDialogOpener('synchronize');
		}
		try {
			await synchronizeItemsArshin(arshinIdIsDone);
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
	};

	const handleGetDataFromFgis = () => {
		// пока еще не работает
		// checkItemsArshin();
		console.log('Запросить данные из ФГИС');
	};

	const handleDeleteItems = async () => {
		if (dataLength && !isOpen && !doesNotContainIsDone) {
			return handleDialogOpener('deleting');
		}
		try {
			await deleteFromArshin(selectedDataIds).unwrap();
			enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
		} finally {
			dispatch(resetSelectedDataItem());
		}
	};

	const handleDialogOpener = (variant: DialogVariants) => {
		dispatch(
			changeDialogState({
				isOpen: true,
				variant,
			})
		);
	};

	return { handleSynchronizeItems, handleGetDataFromFgis, handleDeleteItems };
};
