import { enqueueSnackbar } from 'notistack';

import {
	useCreateNewRequestMutation,
	useDeleteItemsMutation,
	useSynchronizeItemsMutation,
} from '../arshinTableApiSlice';
import {
	resetSelectedDataItem,
	selectDeleteModelIds,
	selectIsOpenSynchronizeDialog,
	selectModelSynchronizeIds,
	selectNotValidArshinItem,
	selectPendingRequestItem,
	selectSelectedArshin,
	selectSynchronizeIds,
} from '../arshinTableSlice';
import { changeDialogState, resetDialogState, selectIsOpenDialog } from '../dialogArshinSlice';
import { selectIsWorkingArshin } from '../eventSourceSlice';

import { Messages } from 'constant/messages';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useArshinActions = () => {
	const dispatch = useAppDispatch();

	const { openSidebarWith } = useSidebarAction('arshin');

	const [deleteFromArshin] = useDeleteItemsMutation();
	const [synchronizeItemsArshin] = useSynchronizeItemsMutation();
	const [sendRequest] = useCreateNewRequestMutation();

	const isOpen = useAppSelector(selectIsOpenDialog);

	const deleteData = useAppSelector(selectDeleteModelIds);

	const synchronizeData = useAppSelector(selectSynchronizeIds);

	const tableItemsNotValidateModel = useAppSelector(selectNotValidArshinItem);

	const synchronizeModelData = useAppSelector(selectModelSynchronizeIds);

	const isOpenerSyncDialog = useAppSelector(selectIsOpenSynchronizeDialog);

	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const isWorking = useAppSelector(selectIsWorkingArshin);

	const pendingRequest = useAppSelector(selectPendingRequestItem);

	const handleSynchronize = async () => {
		try {
			await synchronizeItemsArshin(synchronizeData).unwrap();
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
			return dispatch(changeDialogState('synchronize'));
		}
		try {
			await synchronizeItemsArshin(synchronizeModelData).unwrap();
			enqueueSnackbar(
				synchronizeData.length <= 1
					? Messages.ARSHIN_ITEM_SUCCESSFULLY_UPDATED
					: Messages.ARSHIN_ITEMS_SUCCESSFULLY_UPDATED,
				{
					variant: 'success',
				}
			);
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
		if (Boolean(deleteData.length) && !isOpen) {
			return dispatch(changeDialogState('deleting'));
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

	const handleCloseDialog = () => {
		dispatch(resetDialogState());
	};

	const handleCancelSending = async () => {
		const validate = tableItemsNotValidateModel.map(({ id }) => id);
		const sendItemsArray = selectedDataIds.filter(id => !validate.includes(id));
		handleCloseDialog();
		if (pendingRequest) {
			const sendingRequestData = { ...pendingRequest, dataIds: sendItemsArray };
			await sendRequest(sendingRequestData);
		}
	};

	const handleEditArshinItem = () => {
		openSidebarWith('EditArshinItem');
		handleCloseDialog();
	};

	const handleContextMenuEditArshinItem = () => {
		if (isWorking) return;
		openSidebarWith('EditSidebarArshinItem');
	};

	return {
		handleModelSynchronize,
		handleSynchronize,
		handleDeleteItems,
		handleCloseDialog,
		handleCancelSending,
		handleEditArshinItem,
		handleContextMenuEditArshinItem,
	};
};
