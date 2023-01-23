import { Messages } from 'constant/messages';
import { showNotification } from 'features/notificator/notificatorSlice';
import { useUpdateUserNotificationMutation } from 'features/user/userApiSlice';
import { useAppDispatch } from 'hooks/redux';

import type { INotificationSettings } from 'types/notification';

export const useSubmitUserNotificationActions = (data: INotificationSettings) => {
	const dispatch = useAppDispatch();
	const [sendUpdatedItem] = useUpdateUserNotificationMutation();

	const submitNotificationValue = async () => {
		try {
			await sendUpdatedItem(data).unwrap();
			dispatch(
				showNotification({
					message: Messages.NOTIFICATION_SUCCESSFULY_UPDATED,
					type: 'success',
				})
			);
		} catch {
			dispatch(
				showNotification({
					message: Messages.FAILED_TO_UPDATE_NOTIFICATION,
					type: 'error',
				})
			);
		}
	};

	return { submitNotificationValue };
};
