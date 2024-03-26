import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Controller, useFormContext } from 'react-hook-form';

import { DATE_OF_SENDING_NOTIFICATION, RANGE_OF_SELECTION } from 'constant/mailer';
import type { INotificationSettings } from 'types/notification';

function SelectInputs() {
	const { control } = useFormContext<INotificationSettings>();

	return (
		<Stack gap={1}>
			<Controller
				control={control}
				name='dateOfSendingNotification'
				render={({ field }) => (
					<FormControl fullWidth variant='standard'>
						<InputLabel id='select-date-of-sending-label'>
							Дата отправки уведомлений
						</InputLabel>
						<Select
							{...field}
							value={field.value}
							id='select-date-of-sending'
							labelId='select-date-of-sending-label'
						>
							<MenuItem value={DATE_OF_SENDING_NOTIFICATION.ONE_WEEK}>
								За одну неделю
							</MenuItem>
							<MenuItem value={DATE_OF_SENDING_NOTIFICATION.TWO_WEEKS}>
								За две недели
							</MenuItem>
							<MenuItem value={DATE_OF_SENDING_NOTIFICATION.ONE_MONTH}>За месяц</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
			<Controller
				control={control}
				name='rangeOfSelection'
				render={({ field }) => (
					<FormControl fullWidth variant='standard'>
						<InputLabel id='select-range-of-selection-label'>
							Диапазон дат следующей поверки
						</InputLabel>
						<Select
							{...field}
							value={field.value}
							id='select-range-of-selection'
							labelId='select-range-of-selection-label'
						>
							<MenuItem value={RANGE_OF_SELECTION.MONTH}>Месяц</MenuItem>
							<MenuItem value={RANGE_OF_SELECTION.QUARTER}>Квартал</MenuItem>
							<MenuItem value={RANGE_OF_SELECTION.HALF_A_YEAR}>Полгода</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
		</Stack>
	);
}
export default SelectInputs;
