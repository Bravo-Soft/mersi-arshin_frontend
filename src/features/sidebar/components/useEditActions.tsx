import { useState } from 'react';

import { selectSidebarStateOfHomePage } from '../sidebarSlice';

import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions, selectUserRoles } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';

export const useEditActions = () => {
	const dispatch = useAppDispatch();
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const { isFileStorage } = useAppSelector(selectUserPermissions);
	const { selector } = useAppSelector(selectSidebarStateOfHomePage);

	const { openSidebarWith } = useSidebarAction('home');

	const handleOpenEditForm = () => {
		openSidebarWith('EditDataItem');
	};

	const handleOpenVerificationForm = () => {
		openSidebarWith('VerificateDataItem');
	};

	const hasAccess = isWriter || isAdmin;

	const handleOpenFilesForm = () => {
		isFileStorage
			? openSidebarWith('FilesDataItem')
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	const handleOpenDeletingDialog = () => {
		dispatch(
			changeSmartDialogState({
				variant: 'deleting',
				isOpen: true,
			})
		);
	};

	return {
		handleOpenEditForm,
		handleOpenVerificationForm,
		handleOpenFilesForm,
		handleOpenDeletingDialog,
		isFileStorage,
		hasAccess,
	};
};
