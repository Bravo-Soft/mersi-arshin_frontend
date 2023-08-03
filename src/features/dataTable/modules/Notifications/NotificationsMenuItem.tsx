import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { keyframes } from '@mui/material/styles';

import type { IModuleMenuItemProps } from '../moduleMenuItem';

import { Messages } from 'constant/messages';
import { changeSmartDialogState } from 'features/smartDialog/smartDialogSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import StyledMenuItem from 'styled/StyledMenuItem';

const notificationBang = keyframes`
	25% {
		rotate: 15deg;
	}
	50% {
		rotate: -15deg;
	}
	75% {
		rotate: 15deg;
	}
	100% {
		rotate: 0deg;
	}
`;

function NotificationsMenuItem({ onCloseMenu, ...othen }: IModuleMenuItemProps): JSX.Element {
	const dispatch = useAppDispatch();
	const { isReceiveNotifications } = useAppSelector(selectUserPermissions);
	const { openSidebarWith } = useSidebarAction('home');

	const openNotificationsSettings = () => {
		openSidebarWith('NotificationSettings');
		onCloseMenu();
	};

	const handleOpenNotificationsSettings = () => {
		onCloseMenu();
		isReceiveNotifications
			? openNotificationsSettings()
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
			{...othen}
			onClick={handleOpenNotificationsSettings}
			moduleIsActive={isReceiveNotifications}
			sx={{
				...(isReceiveNotifications && {
					':hover': {
						'& .MuiSvgIcon-root': {
							animation: `${notificationBang} 0.3s both`,
						},
					},
				}),
			}}
		>
			<ListItemIcon>
				{isReceiveNotifications ? <NotificationsIcon /> : <LockIcon />}
			</ListItemIcon>
			<ListItemText>Уведомления</ListItemText>
		</StyledMenuItem>
	);
}

export default NotificationsMenuItem;
