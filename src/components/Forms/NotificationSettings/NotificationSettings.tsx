import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { notificationDateFormater } from './notificationDateFormater';
import { notificationDefaultValue } from './notificationDefaultValue';
import NotificationMainForm from './NotificationMainForm';
import { notificationResolver } from './notificationResolver';

import { Messages } from 'constant/messages';
import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import {
	useGetUserNotificationQuery,
	useUpdateUserNotificationMutation,
} from 'features/user/userApiSlice';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import type { INotificationSettings } from 'types/notification';
import { formTrimming } from 'utils/formTrimming';

function NotificationSettings() {
	const { settings, isGetDataFetching, isLoading } = useGetUserNotificationQuery(undefined, {
		selectFromResult: ({ data, isFetching, isLoading }) => ({
			settings: data,
			isGetDataFetching: isFetching,
			isLoading,
		}),
	});

	const methods = useForm<INotificationSettings>({
		values: settings,
		resolver: notificationResolver,
		defaultValues: notificationDefaultValue,
	});

	const { handleSubmit } = methods;

	const [sendUpdatedItem] = useUpdateUserNotificationMutation();

	const submitNotificationValue = useCallback(
		async (data: INotificationSettings) => {
			try {
				await sendUpdatedItem(formTrimming(notificationDateFormater(data))).unwrap();
				enqueueSnackbar(Messages.NOTIFICATION_SUCCESSFULLY_UPDATED, { variant: 'success' });
			} catch {
				enqueueSnackbar(Messages.FAILED_TO_UPDATE_NOTIFICATION, { variant: 'error' });
			}
		},
		[sendUpdatedItem]
	);

	return (
		<FormContainer onSubmit={handleSubmit(submitNotificationValue)}>
			{isGetDataFetching ? (
				<FetchingProgress isFetching={isGetDataFetching} />
			) : (
				<Stack
					direction='column'
					px={3.5}
					rowGap={1}
					flexGrow={1}
					justifyContent='space-between'
				>
					<FormProvider {...methods}>
						<NotificationMainForm />
					</FormProvider>
				</Stack>
			)}
			<ButtonContainer sx={{ mt: 4 }}>
				<Button
					variant='contained'
					fullWidth
					type='submit'
					disabled={isGetDataFetching || isLoading}
				>
					Сохранить
				</Button>
			</ButtonContainer>
		</FormContainer>
	);
}

export default NotificationSettings;
