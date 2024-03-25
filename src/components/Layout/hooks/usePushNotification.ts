import { enqueueSnackbar } from 'notistack';
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	useReadAllNotificationMutation,
	useReadNotificationMutation,
} from '../api/NotificationApiSlice';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import { useAnchor } from 'features/dataTable/modules/CreateVerificationSchedule/components/utils/hooks';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export const usePushNotification = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { isArshin } = useAppSelector(selectUserPermissions);

	const [anchorEl, handleOpen, handleClose] = useAnchor();

	const [readMutation] = useReadNotificationMutation();
	const [readAllMutation] = useReadAllNotificationMutation();

	const handleNavigateToArshin = (id: string) => async () => {
		try {
			await readMutation(id);
		} finally {
			navigate(AppRoutes.ARSHIN);
			localStorage.setItem('Arshin-filter', 'Done');
			handleClose();
		}
	};

	const handleReadAll = async () => {
		try {
			await readAllMutation();
		} finally {
			handleClose();
		}
	};
	const handleRead = (id: string) => async () => {
		await readMutation(id);
	};

	const handleClickIconNotification = (event: SyntheticEvent) => {
		isArshin
			? handleOpen(event)
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	return {
		anchorEl,
		isArshin,
		handleRead,
		handleReadAll,
		handleNavigateToArshin,
		handleClose,
		handleOpen: handleClickIconNotification,
	};
};
