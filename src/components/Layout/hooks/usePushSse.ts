import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';

import { apiSlice } from 'app/apiSlice';
import { useServerSentEvent } from 'features/dataTable/modules/Arshin/hooks/useServerSentEvent';
import { useAppDispatch } from 'hooks/redux';

export const usePushSse = () => {
	const dispatch = useAppDispatch();

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

	useServerSentEvent(`/api/notifications/message`, callBack);
};
