import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useAnchor } from '../../features/dataTable/modules/CreateVerificationSchedule/components/utils/hooks';

import StyledLayoutNotificationListItemBtn from './styled/StyledLayoutNotificationListItemBtn';
import StyledLayoutNotificationPopover from './styled/StyledLayoutNotificationPopover';

function LayoutNotificationIcon() {
	const [anchorEl, handleOpen, handleClose] = useAnchor();

	// TODO Убрать когда появится Back
	const notification = 1;

	const handleClick = () => {
		console.log('CLICK');
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
				handleClose={handleClose}
				notification={Boolean(notification)}
			>
				<DialogTitle>Уведомления</DialogTitle>
				<DialogContent>
					{notification ? (
						<List>
							<StyledLayoutNotificationListItemBtn onClick={handleClick}>
								<ListItemText
									primary='ФГИС Аршин'
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

export default LayoutNotificationIcon;
