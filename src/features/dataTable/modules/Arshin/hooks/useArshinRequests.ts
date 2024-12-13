import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import {
	useCreateNewRequestMutation,
	useDeleteRequestMutation,
	useUpdateRequestMutation,
} from '../arshinTableApiSlice';
import {
	setRequest,
	selectRequest,
	resetPendingRequest,
	resetSelectedDataItems,
	selectSelectedDataItems,
	setFilterType,
	selectSelectedArshin,
} from '../arshinTableSlice';
import {
	changeDialogState,
	resetDialogState,
	selectCreatingRequestDialog,
	selectDeletingRequestDialog,
	selectEditingRequestDialog,
	selectIsOpenDialog,
} from '../dialogArshinSlice';

import { useSendingArshin } from './useSendingArshin';

import { Messages } from 'constant/messages';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { ARSHIN_FILTER_TYPE, type IRequestItem } from 'types/arshinIntegration';

export const useArshinRequests = () => {
	const dispatch = useAppDispatch();
	const { openSidebarWith, closeSidebar } = useSidebarAction('arshin');
	const { handleStart } = useSendingArshin();

	const [createRequest, { isLoading: isCreating }] = useCreateNewRequestMutation();
	const [updateRequest] = useUpdateRequestMutation();
	const [deleteRequest] = useDeleteRequestMutation();

	const { open: isRequestsListOpen } = useAppSelector(selectSidebarStateOfArshinPage);

	const selectedDataItems = useAppSelector(selectSelectedDataItems);
	const selectedDataIds = useAppSelector(selectSelectedArshin);

	const selectedRequest = useAppSelector(selectRequest);

	const isCreatingRequestDialogOpen = useAppSelector(selectCreatingRequestDialog);
	const isEditingRequestDialogOpen = useAppSelector(selectEditingRequestDialog);
	const isDeletingRequestDialogOpen = useAppSelector(selectDeletingRequestDialog);

	const isDialogOpen = useAppSelector(selectIsOpenDialog);

	const now = dayjs(new Date());

	const handleSelectRequest = (data: IRequestItem) => {
		dispatch(setRequest(data));
		dispatch(setFilterType(ARSHIN_FILTER_TYPE.REQUEST_ITEMS));
	};

	const handleCloseDialog = () => {
		dispatch(resetPendingRequest());
		dispatch(resetSelectedDataItems());
		dispatch(resetDialogState());
	};

	const handleCreateRequest = () => {
		dispatch(changeDialogState('createRequest'));
	};

	const handleEditRequest = () => {
		dispatch(changeDialogState('editRequest'));
	};

	const handleSendRequest = async (data: Omit<IRequestItem, 'id' | 'status' | 'creator'>) => {
		await handleStart(data);
		closeSidebar();
		handleCloseDialog();
		openSidebarWith('RequestsList');
	};

	const handleUpdateRequest = async (
		data: Omit<IRequestItem, 'dataIds' | 'status' | 'creator'>
	) => {
		await updateRequest(data).unwrap();
		handleCloseDialog();
	};

	const handleDeleteRequestItem = async () => {
		if (!isDeletingRequestDialogOpen) {
			return dispatch(changeDialogState('deleteRequest'));
		}
		try {
			if (selectedRequest?.id) {
				await deleteRequest(selectedRequest.id).unwrap();
				resetSelectedRequest();
				enqueueSnackbar(Messages.REQUEST_SUCCESSFULLY_DELETED, { variant: 'success' });
			}
		} catch {
			enqueueSnackbar(Messages.FAILED_DELETE_REQUEST, { variant: 'error' });
		} finally {
			handleCloseDialog();
		}
	};

	const resetSelectedRequest = () => {
		dispatch(setRequest(null));
		dispatch(setFilterType(ARSHIN_FILTER_TYPE.MY_ITEMS));
	};

	return {
		now,
		isDialogOpen,
		isCreatingRequestDialogOpen,
		isEditingRequestDialogOpen,
		isDeletingRequestDialogOpen,
		isRequestsListOpen,
		isCreating,
		selectedRequest,
		selectedDataItems,
		selectedDataIds,
		handleCloseDialog,
		handleSelectRequest,
		handleCreateRequest,
		handleEditRequest,
		handleSendRequest,
		handleUpdateRequest,
		handleDeleteRequestItem,
		resetSelectedRequest,
	};
};
