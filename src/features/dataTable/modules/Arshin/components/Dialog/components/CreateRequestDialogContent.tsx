import { FormControlLabel, Switch } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Controller, useFormContext } from 'react-hook-form';

import PeriodicitySelect from './PeriodicitySelect';

import { IRequestItemWithDates } from 'types/arshinIntegration';

function CreateRequestDialogContent() {
	const { control } =
		useFormContext<Pick<IRequestItemWithDates, 'range' | 'sendEmail' | 'period'>>();

	return (
		<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Controller
				control={control}
				name='range'
				render={({ field: { value, onChange, ref }, formState: { errors } }) => (
					<DateRangePicker
						ref={ref}
						value={value}
						onChange={onChange}
						slotProps={{
							fieldSeparator: { hidden: true },
						}}
						localeText={{ start: 'Начальная дата', end: 'Дата окончания' }}
					/>
				)}
			/>
			<PeriodicitySelect />
			<Controller
				control={control}
				name='sendEmail'
				render={({ field: { value, onChange, ref } }) => (
					<FormControlLabel
						control={<Switch ref={ref} checked={value} onChange={onChange} />}
						label='Уведомление на почту'
					/>
				)}
			/>
		</DialogContent>
	);
}

export default CreateRequestDialogContent;
