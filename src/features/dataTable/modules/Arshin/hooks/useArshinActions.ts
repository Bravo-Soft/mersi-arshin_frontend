import { enqueueSnackbar } from 'notistack';

import { useDeleteItemsMutation, useSynchronizeItemsMutation } from '../arshinTableApiSlice';
import {
	resetSelectedDataItem,
	selectDeleteModelIds,
	selectIsOpenSynchronizeDialog,
	selectModelSynchronizeIds,
	selectSynchronizeIds,
} from '../arshinTableSlice';
import {
	DialogVariants,
	changeDialogState,
	resetDialogState,
	selectIsOpenDialog,
} from '../dialogArshinSlice';

import { Messages } from 'constant/messages';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const useArshinActions = () => {
	const dispatch = useAppDispatch();
	const [deleteFromArshin] = useDeleteItemsMutation();
	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();

	const isOpen = useAppSelector(selectIsOpenDialog);

	const deleteData = useAppSelector(selectDeleteModelIds);

	const synchronizeData = useAppSelector(selectSynchronizeIds);

	const synchronizeModelData = useAppSelector(selectModelSynchronizeIds);

	const isOpenerSyncDialog = useAppSelector(selectIsOpenSynchronizeDialog);

	const handleSynchronize = async () => {
		try {
			await synchronizeItemsArshin(synchronizeData);
			enqueueSnackbar(Messages.ARSHIN_ITEM_SUCCESSFULLY_UPDATED, {
				variant: 'success',
			});
		} catch {
			enqueueSnackbar(Messages.FAILED_ARSHIN_ITEM_UPDATED, {
				variant: 'error',
			});
		} finally {
			dispatch(resetDialogState());
		}
	};

	const handleModelSynchronize = async () => {
		if (!isOpenerSyncDialog && !isOpen) {
			return handleDialogOpener('synchronize');
		}
		try {
			await synchronizeItemsArshin(synchronizeModelData);
			enqueueSnackbar(Messages.ARSHIN_ITEM_SUCCESSFULLY_UPDATED, {
				variant: 'success',
			});
		} catch {
			enqueueSnackbar(Messages.FAILED_ARSHIN_ITEM_UPDATED, {
				variant: 'error',
			});
		} finally {
			dispatch(resetSelectedDataItem());
			dispatch(resetDialogState());
		}
	};

	const handleDeleteItems = async () => {
		if (Boolean(synchronizeModelData.length) && !isOpen) {
			return handleDialogOpener('deleting');
		}
		try {
			await deleteFromArshin(deleteData).unwrap();
			enqueueSnackbar(Messages.ITEM_SUCCESSFULLY_DELETED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_DELETE_ITEM, { variant: 'error' });
		} finally {
			dispatch(resetSelectedDataItem());
			dispatch(resetDialogState());
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

	const handleCloseDialog = () => {
		dispatch(resetDialogState());
	};

	return {
		handleModelSynchronize,
		handleSynchronize,
		handleDeleteItems,
		handleCloseDialog,
	};
};
