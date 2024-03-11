import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { isDayjs } from 'dayjs';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { maxDate, minDate } from '../../../constant/dateMasks';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};

function DatePickerFilterField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<DatePicker
					{...field}
					value={dayjs(field.value)}
					onChange={newDate => {
						if (isDayjs(newDate)) {
							field.onChange(newDate);
						}
					}}
					label='Дата фильтрации'
					slotProps={{
						textField: {
							inputRef: field.ref,
							error: Boolean(error),
						},
					}}
					minDate={dayjs(minDate)}
					maxDate={dayjs(maxDate)}
				/>
			)}
		/>
	);
}

export default DatePickerFilterField;
