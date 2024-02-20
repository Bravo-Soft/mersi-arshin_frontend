import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import EmailInputs from './EmailInputs';
import { notificationDateFormater } from './notificationDateFormater';
import { notificationResolver } from './notificationResolver';
import SelectInputs from './SelectInputs';

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
	});

	const { handleSubmit, watch, control } = methods;
	const switchNotification = watch('isNotificationEnabled');

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
			<FetchingProgress isFetching={isGetDataFetching} />
			{!isGetDataFetching && (
				<Stack
					direction='column'
					px={3.5}
					rowGap={1}
					flexGrow={1}
					justifyContent='space-between'
				>
					<FormProvider {...methods}>
						<Box>
							<Controller
								control={control}
								name='isNotificationEnabled'
								render={({ field: { value, ...props } }) => (
									<FormControlLabel
										sx={{ mb: 2 }}
										control={<Switch {...props} checked={value} />}
										label='Уведомления о поверках'
									/>
								)}
							/>
							<Fade in={switchNotification}>
								<Stack gap={4}>
									<SelectInputs />
									<EmailInputs />
								</Stack>
							</Fade>
						</Box>
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
