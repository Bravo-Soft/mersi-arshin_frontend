import DialogContent from '@mui/material/DialogContent';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import PeriodicitySelect from './PeriodicitySelect';

// import { maxDate, minDate } from 'constant/dateMasks';

function CreateRequestDialogContent() {
	const { control } = useFormContext<any>();

	return (
		<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Controller
				control={control}
				name='fieldsDate'
				render={({ field: { value, onChange, ref }, formState: { errors } }) => (
					<DateRangePicker
						ref={ref}
						value={value}
						onChange={onChange}
						// minDate={dayjs(Date.now())}
						// maxDate={dayjs(Date.now())}
						slotProps={{
							fieldSeparator: { hidden: true },
							// textField: ({ position }) => {
							// 	const error = null;
							// 	return {
							// 		error: Boolean(error ?? errors.fieldsDate),
							// 		helperText: error?.message ?? ' ',
							// 	};
							// },
						}}
						localeText={{ start: 'Начальная дата', end: 'Дата окончания' }}
					/>
				)}
			/>
			<PeriodicitySelect />
		</DialogContent>
	);
}

export default CreateRequestDialogContent;
