import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	useReadAllNotificationMutation,
	useReadNotificationMutation,
} from '../api/NotificationApiSlice';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import { setFilterType } from 'features/dataTable/modules/Arshin/arshinTableSlice';
import { useAnchor } from 'features/dataTable/modules/CreateVerificationSchedule/components/utils/hooks';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { ARSHIN_FILTER_TYPE } from 'types/arshinIntegration';

export const usePushNotification = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { isArshin } = useAppSelector(selectUserPermissions);
	const { openSidebarWith } = useSidebarAction('arshin');
	const [anchorEl, handleOpen, handleClose] = useAnchor();

	const [readMutation] = useReadNotificationMutation();
	const [readAllMutation] = useReadAllNotificationMutation();

	const handleNavigateToArshin = (id: string) => async () => {
		try {
			await readMutation(id);
		} finally {
			navigate(AppRoutes.ARSHIN);
			openSidebarWith('RequestsList');
			dispatch(setFilterType(ARSHIN_FILTER_TYPE.MY_COMPLETED));
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
