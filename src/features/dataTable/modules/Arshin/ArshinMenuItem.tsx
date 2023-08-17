import LockIcon from '@mui/icons-material/Lock';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

import { IModuleMenuItemProps } from '../moduleMenuItem';

import { ArshinIcon } from './ArshinIcon';

import { AppRoutes } from 'constant/appRoutes';
import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { useAppDispatch } from 'hooks/redux';
import StyledMenuItem from 'styled/StyledMenuItem';

function ArshinMenuItem({ onCloseMenu, ...othen }: IModuleMenuItemProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	// const { isArshin } = useAppSelector(selectUserPermissions);

	const isArshin = true;

	const arshinNavigateAction = () => {
		navigate(AppRoutes.ARSHIN);
		localStorage.removeItem('Arshin-filter');
	};

	const handleRouteToArshin = () => {
		onCloseMenu();
		isArshin
			? arshinNavigateAction()
			: dispatch(
					changeSmartDialogState({
						variant: 'payment',
						isOpen: true,
						content: Messages.MODULE_IS_NOT_PAID,
					})
			  );
	};

	return (
		<StyledMenuItem {...othen} onClick={handleRouteToArshin} moduleIsActive={isArshin}>
			<ListItemIcon>{isArshin ? <ArshinIcon /> : <LockIcon />}</ListItemIcon>
			<ListItemText>Перейти в модуль Аршин</ListItemText>
		</StyledMenuItem>
	);
}

export default ArshinMenuItem;
