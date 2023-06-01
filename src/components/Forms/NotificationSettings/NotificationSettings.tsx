import { useGetUserNotificationQuery } from 'features/user/userApiSlice';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSubmitUserNotificationActions } from './hooks/useSubmitUserNotificationActions';

import type { INotificationSettings } from 'types/notification';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FetchingProgress from 'features/dataTable/components/FetchingProgress';
import ButtonContainer from 'styled/ButtonContainer';
import FormContainer from 'styled/FormContainer';
import EmailInputs from './EmailInputs';
import SelectInputs from './SelectInputs';

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
	});

	const { getValues, handleSubmit, watch, control } = methods;

	const { submitNotificationValue } = useSubmitUserNotificationActions(getValues());
	const switchNotification = watch('isNotificationEnabled');
	const onSubmit = handleSubmit(submitNotificationValue);

	return (
		<FormContainer onSubmit={onSubmit}>
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
