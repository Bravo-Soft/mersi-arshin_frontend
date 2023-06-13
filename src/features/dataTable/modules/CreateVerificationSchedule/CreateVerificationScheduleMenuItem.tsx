import AddchartIcon from '@mui/icons-material/Addchart';
import LockIcon from '@mui/icons-material/Lock';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import type { IModuleMenuItemProps } from '../moduleMenuItem';

import { Messages } from 'constant/messages';
import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';


function CreateVerificationScheduleMenuItem({
	onCloseMenu,
	...othen
}: IModuleMenuItemProps): JSX.Element {
	const dispatch = useAppDispatch();

	const { createVerificationSchedule } = useAppSelector(selectUserPermissions);

	const openCreateVerificationScheduleForm = () => {
		dispatch(setVerificationScheduleModal(true));
	};

	const handleOpenCreateVerificationScheduleForm = () => {
		onCloseMenu();
		createVerificationSchedule
			? openCreateVerificationScheduleForm()
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	return (
		<StyledMenuItem
			moduleIsActive={createVerificationSchedule}
			onClick={handleOpenCreateVerificationScheduleForm}
			{...othen}
		>
			<ListItemIcon>{createVerificationSchedule ? <AddchartIcon /> : <LockIcon />}</ListItemIcon>
			<ListItemText>Создать график поверки</ListItemText>
		</StyledMenuItem>
	);
}

export default CreateVerificationScheduleMenuItem;
