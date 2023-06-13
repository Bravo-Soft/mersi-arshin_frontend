import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export function OnlineStatus() {
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const handleSetOnlineStatus = () => {
			enqueueSnackbar('Соединение восстановлено', { variant: 'success' });
		};

		const handleRemoveOnlineStatus = () => {
			enqueueSnackbar('Соединение c сетью интернет оборвано', {
				variant: 'error',
			});
		};

		window.addEventListener('online', handleSetOnlineStatus);
		window.addEventListener('offline', handleRemoveOnlineStatus);

		return () => {
			window.removeEventListener('online', handleSetOnlineStatus);
			window.removeEventListener('offline', handleRemoveOnlineStatus);
		};
	}, [enqueueSnackbar]);

	return null;
}
