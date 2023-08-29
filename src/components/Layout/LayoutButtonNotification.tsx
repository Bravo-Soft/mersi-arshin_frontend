import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import StyledLayoutNotificationListItemBtn from './styled/StyledLayoutNotificationListItemBtn';
import StyledLayoutNotificationPopover from './styled/StyledLayoutNotificationPopover';

import { AppRoutes } from 'constant/appRoutes';
import { useAnchor } from 'features/dataTable/modules/CreateVerificationSchedule/components/utils/hooks';

function LayoutButtonNotification() {
	const [anchorEl, handleOpen, handleClose] = useAnchor();

	const navigate = useNavigate();
	// TODO Убрать когда появится Back
	const notification = 1;

	const handleClick = () => {
		navigate(AppRoutes.ARSHIN);
		localStorage.setItem('Arshin-filter', 'Done');
		handleClose();
	};

	return (
		<>
			<Tooltip title='Уведомления'>
				<IconButton onClick={handleOpen}>
					<Badge badgeContent={notification} color='info' variant='dot'>
						<NotificationsIcon sx={{ color: '#ffffff' }} />
					</Badge>
				</IconButton>
			</Tooltip>
			<StyledLayoutNotificationPopover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				hasNotification={Boolean(notification)}
			>
				<DialogTitle>Уведомления</DialogTitle>
				<DialogContent>
					{notification ? (
						<List>
							<StyledLayoutNotificationListItemBtn onClick={handleClick}>
								<ListItemText
									primary='Контроль поверки в Госреестре'
									secondary='Обновите данные по отправленным СИ (14 шт)'
								/>
								<Typography variant='button'>Перейти</Typography>
							</StyledLayoutNotificationListItemBtn>
						</List>
					) : (
						<Typography textAlign='center' color='text.secondary' fontSize={14}>
							Нет уведомлений
						</Typography>
					)}
				</DialogContent>
			</StyledLayoutNotificationPopover>
		</>
	);
}

export default LayoutButtonNotification;
