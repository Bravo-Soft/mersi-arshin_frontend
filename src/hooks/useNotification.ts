import { showNotification } from 'features/notificator/notificatorSlice';
import { useCallback } from 'react';

import type { AppDispatch } from 'app/store';
import { Messages } from 'constant/messages';
import type { VariantType } from 'notistack';

type UseNotificationReturned = (
	dispatch: AppDispatch
) => (message: keyof typeof Messages, type: VariantType) => void;

const useNotification: UseNotificationReturned = dispatch =>
	useCallback(
		(message, type) => {
			dispatch(
				showNotification({
					message: Messages[message],
					type,
				})
			);
		},
		[dispatch]
	);

export default useNotification;
