import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { INotificationSettings } from '../../../types/notification';

import EmailInputs from './EmailInputs';
import SelectInputs from './SelectInputs';

function NotificationMainForm() {
	const { control, watch } = useFormContext<INotificationSettings>();

	const switchNotification = watch('isNotificationEnabled');

	return (
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
	);
}

export default NotificationMainForm;
