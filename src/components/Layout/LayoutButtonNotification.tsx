import DoneAllIcon from '@mui/icons-material/DoneAll';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReplyIcon from '@mui/icons-material/Reply';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { TransitionGroup } from 'react-transition-group';

import { useGetNotificationsQuery } from './api/NotificationApiSlice';
import { usePushNotification } from './hooks/usePushNotification';
import { usePushSse } from './hooks/usePushSse';
import StyledLayoutNotificationBtn from './styled/StyledLayoutNotificationBtn';
import StyledLayoutNotificationListItem from './styled/StyledLayoutNotificationListItemBtn';
import StyledLayoutNotificationPopover from './styled/StyledLayoutNotificationPopover';

import { useAuth } from 'hooks/useAuth';
import { hideScrollbar } from 'utils/hideScrollbar';

function LayoutButtonNotification() {
	usePushSse();
	const isAuth = useAuth();

	const { data: notification = [] } = useGetNotificationsQuery(undefined, { skip: !isAuth });

	const {
		isArshin,
		anchorEl,
		handleOpen,
		handleClose,
		handleRead,
		handleReadAll,
		handleNavigateToArshin,
	} = usePushNotification();

	return (
		<>
			<Tooltip title='Уведомления'>
				<StyledLayoutNotificationBtn onClick={handleOpen} moduleIsActive={isArshin}>
					<Badge badgeContent={notification.length} color='info' variant='dot'>
						<NotificationsIcon sx={{ color: '#ffffff' }} />
					</Badge>
				</StyledLayoutNotificationBtn>
			</Tooltip>
			<StyledLayoutNotificationPopover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				hasNotification={Boolean(notification)}
			>
				<Stack flexDirection='row' justifyContent='space-between'>
					<Typography variant='h2' fontSize=' 1.25rem' fontWeight='500'>
						Уведомления
					</Typography>
					<Button
						disabled={!notification.length}
						sx={{ color: 'text.secondary' }}
						variant='text'
						startIcon={<MarkEmailReadIcon />}
						onClick={handleReadAll}
					>
						Прочитать все
					</Button>
				</Stack>

				<DialogContent sx={{ maxHeight: 350, ...hideScrollbar() }}>
					{notification.length ? (
						<List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
							<TransitionGroup>
								{notification.map(({ header, id, message }) => (
									<Collapse key={id} sx={{ marginY: 1 }}>
										<StyledLayoutNotificationListItem sx={{ gap: 2 }} key={id}>
											<ListItemText primary={header} secondary={message} />
											<Tooltip title='Прочитать'>
												<IconButton onClick={handleRead(id)}>
													<DoneAllIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title='Перейти'>
												<IconButton onClick={handleNavigateToArshin(id)}>
													<ReplyIcon sx={{ transform: 'scale(-1, 1)' }} />
												</IconButton>
											</Tooltip>
										</StyledLayoutNotificationListItem>
									</Collapse>
								))}
							</TransitionGroup>
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
