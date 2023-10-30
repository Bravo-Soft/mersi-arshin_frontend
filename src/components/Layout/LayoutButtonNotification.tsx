import DoneAllIcon from '@mui/icons-material/DoneAll';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReplyIcon from '@mui/icons-material/Reply';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	useGetNotificationsQuery,
	useReadAllNotificationMutation,
	useReadNotificationMutation,
} from './api/NotificationApiSLice';
import StyledLayoutNotificationListItem from './styled/StyledLayoutNotificationListItemBtn';
import StyledLayoutNotificationPopover from './styled/StyledLayoutNotificationPopover';

import { apiSlice } from 'app/apiSlice';
import { AppRoutes } from 'constant/appRoutes';
import { BASE_URL } from 'constant/baseUrl';
import { useServerSentEvent } from 'features/dataTable/modules/Arshin/hooks/useServerSentEvent';
import { useAnchor } from 'features/dataTable/modules/CreateVerificationSchedule/components/utils/hooks';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';
import { hideScrollbar } from 'utils/hideScrollbar';

function LayoutButtonNotification() {
	const isAuth = useAuth();

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [anchorEl, handleOpen, handleClose] = useAnchor();

	const { data: notification = [] } = useGetNotificationsQuery(undefined, { skip: !isAuth });

	const [readMutation] = useReadNotificationMutation();
	const [readAllMutation] = useReadAllNotificationMutation();

	const handleNavigateToArshin = (id: string) => async () => {
		readMutation(id);
		navigate(AppRoutes.ARSHIN);
		localStorage.setItem('Arshin-filter', 'Done');
		handleClose();
	};

	const handleReadAllNotifications = async () => {
		await readAllMutation();
		handleClose();
	};
	const handleReadNotification = (id: string) => async () => {
		await readMutation(id);
		handleClose();
	};

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { message } = JSON.parse(event.data);
			dispatch(apiSlice.util.invalidateTags(['PushNotification']));
			enqueueSnackbar(message, {
				variant: 'info',
			});
		},
		[dispatch]
	);

	useServerSentEvent(`${BASE_URL}/api/mersi/notifications/arshin `, callBack);

	return (
		<>
			<Tooltip title='Уведомления'>
				<IconButton onClick={handleOpen}>
					<Badge badgeContent={notification.length} color='info' variant='dot'>
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
				<Stack flexDirection='row' justifyContent='space-between'>
					<Typography variant='h2' fontSize=' 1.25rem' fontWeight='500'>
						Уведомления
					</Typography>
					<Button
						disabled={!notification.length}
						sx={{ color: 'text.secondary' }}
						variant='text'
						startIcon={<MarkEmailReadIcon />}
						onClick={handleReadAllNotifications}
					>
						Прочитать все
					</Button>
				</Stack>

				<DialogContent sx={{ maxHeight: 350, ...hideScrollbar() }}>
					{notification.length ? (
						<List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
							{notification.map(({ header, id, message }) => (
								<StyledLayoutNotificationListItem sx={{ gap: 2 }} key={id}>
									<ListItemText primary={header} secondary={message} />
									<Tooltip title='Прочитать'>
										<IconButton onClick={handleReadNotification(id)}>
											<DoneAllIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title='Перейти'>
										<IconButton onClick={handleNavigateToArshin(id)}>
											<ReplyIcon sx={{ transform: 'scale(-1, 1)' }} />
										</IconButton>
									</Tooltip>
								</StyledLayoutNotificationListItem>
							))}
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
