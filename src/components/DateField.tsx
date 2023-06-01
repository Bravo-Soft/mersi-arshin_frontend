import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import { maxDate, minDate } from 'constant/dateMasks';

import type { Validate } from 'react-hook-form';
import type { IDataItemWithDates } from 'types/dataItem';

interface IDateFieldsProps {
	label: string;
	nameOfKey: keyof Pick<
		IDataItemWithDates,
		'productionDate' | 'verificationDate' | 'dateOfTheNextVerification'
	>;
	readOnly?: boolean;
	validation?:
		| Validate<Date, IDataItemWithDates>
		| Record<string, Validate<Date, IDataItemWithDates>>;
}

function DateField({ label, nameOfKey, readOnly, validation }: IDateFieldsProps): JSX.Element {
	const { control } = useFormContext<IDataItemWithDates>();

	return (
		<Controller
			control={control}
			name={nameOfKey}
			rules={{
				required: {
					message: 'Это поле обязательное',
					value: true,
				},
				validate: validation,
			}}
			render={({ field, fieldState: { error } }) => (
				<DatePicker
					{...field}
					label={label}
					readOnly={readOnly}
					minDate={minDate}
					maxDate={maxDate}
					slotProps={{
						textField: {
							error: Boolean(error),
							helperText: error?.message,
						},
					}}
				/>
			)}
		/>
	);
}

export default DateField;
