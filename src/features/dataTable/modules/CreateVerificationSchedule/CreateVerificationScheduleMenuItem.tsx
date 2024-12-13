import AddchartIcon from '@mui/icons-material/Addchart';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import type { IModuleMenuItemProps } from '../moduleMenuItem';

import { setVerificationScheduleModal } from 'features/dataTable/dataTableSlice';
import { useAppDispatch } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

function CreateVerificationScheduleMenuItem({
	onCloseMenu,
	...othen
}: IModuleMenuItemProps): JSX.Element {
	const dispatch = useAppDispatch();

	const openCreateVerificationScheduleForm = () => {
		dispatch(setVerificationScheduleModal(true));
	};

	const handleOpenCreateVerificationScheduleForm = () => {
		onCloseMenu();

		openCreateVerificationScheduleForm();
	};

	return (
		<StyledMenuItem
			moduleIsActive={true}
			onClick={handleOpenCreateVerificationScheduleForm}
			{...othen}
		>
			<ListItemIcon>
				<AddchartIcon />
			</ListItemIcon>
			<ListItemText sx={{ whiteSpace: 'normal' }}>
				График метрологических работ (МР)
			</ListItemText>
		</StyledMenuItem>
	);
}

export default CreateVerificationScheduleMenuItem;
