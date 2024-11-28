import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { useCreateNewRequestMutation } from '../arshinTableApiSlice';
import { setRequest, selectRequest, resetSelectedDataItem } from '../arshinTableSlice';
import {
	changeDialogState,
	resetDialogState,
	selectCreatingRequestDialog,
	selectDeletingRequestDialog,
	selectEditingRequestDialog,
	selectIsOpenDialog,
} from '../dialogArshinSlice';

import { Messages } from 'constant/messages';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { type IRequestItem } from 'types/arshinIntegration';

export const useArshinRequests = () => {
	const dispatch = useAppDispatch();
	const { openSidebarWith } = useSidebarAction('arshin');

	// const [deleteRequest] = useDeleteRequestMutation();
	const [createRequest] = useCreateNewRequestMutation();

	const { open: isRequestsListOpen } = useAppSelector(selectSidebarStateOfArshinPage);
	const selectedRequest = useAppSelector(selectRequest) as IRequestItem;

	const isCreatingRequestDialogOpen = useAppSelector(selectCreatingRequestDialog);
	const isEditingRequestDialogOpen = useAppSelector(selectEditingRequestDialog);
	const isDeletingRequestDialogOpen = useAppSelector(selectDeletingRequestDialog);

	const isDialogOpen = useAppSelector(selectIsOpenDialog);

	const now = dayjs(new Date());

	const handleSelectRequest = (data: IRequestItem) => {
		dispatch(setRequest(data));
	};

	const handleCloseDialog = () => {
		dispatch(resetDialogState());
	};

	const handleCreateRequest = () => {
		return dispatch(changeDialogState('createRequest'));
	};

	const handleEditRequest = () => {
		return dispatch(changeDialogState('editRequest'));
	};

	const handleSendRequest = async (data: IRequestItem) => {
		try {
			await createRequest(data).unwrap();
			enqueueSnackbar(Messages.REQUEST_SUCCESSFULLY_SENDED, { variant: 'success' });
			openSidebarWith('RequestsList');
		} catch {
			enqueueSnackbar(Messages.FAILED_SEND_REQUEST, { variant: 'error' });
		} finally {
			dispatch(resetSelectedDataItem());
			handleCloseDialog();
		}
	};

	const handleDeleteRequestItem = () => {
		if (!isDeletingRequestDialogOpen) {
			return dispatch(changeDialogState('deleteRequest'));
		}
		try {
			// await deleteRequest(deleteId).unwrap();
			enqueueSnackbar(Messages.REQUEST_SUCCESSFULLY_DELETED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_DELETE_REQUEST, { variant: 'error' });
		} finally {
			handleCloseDialog();
		}
	};

	const resetSelectedRequest = () => dispatch(setRequest(null));

	return {
		now,
		isDialogOpen,
		isCreatingRequestDialogOpen,
		isEditingRequestDialogOpen,
		isDeletingRequestDialogOpen,
		isRequestsListOpen,
		selectedRequest,
		handleCloseDialog,
		handleSelectRequest,
		handleCreateRequest,
		handleEditRequest,
		handleSendRequest,
		handleDeleteRequestItem,
		resetSelectedRequest,
	};
};
