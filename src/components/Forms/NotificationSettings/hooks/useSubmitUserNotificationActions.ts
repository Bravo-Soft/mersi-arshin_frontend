import { enqueueSnackbar } from 'notistack';

import { Messages } from 'constant/messages';
import { useUpdateUserNotificationMutation } from 'features/user/userApiSlice';
import type { INotificationSettings } from 'types/notification';

export const useSubmitUserNotificationActions = (data: INotificationSettings) => {
	const [sendUpdatedItem] = useUpdateUserNotificationMutation();

	const submitNotificationValue = async () => {
		try {
			await sendUpdatedItem(data).unwrap();
			enqueueSnackbar(Messages.NOTIFICATION_SUCCESSFULLY_UPDATED, { variant: 'success' });
		} catch {
			enqueueSnackbar(Messages.FAILED_TO_UPDATE_NOTIFICATION, { variant: 'error' });
		}
	};

	return { submitNotificationValue };
};
