import { useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { selectNotification } from './notificatorSlice';
import { useSnackbar } from 'notistack';

function Notificator(): null {
	const notification = useAppSelector(selectNotification);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (notification) {
			enqueueSnackbar(notification.message, {
				variant: notification.type,
			});
		}
	}, [enqueueSnackbar, notification]);

	return null;
}

export default Notificator;
