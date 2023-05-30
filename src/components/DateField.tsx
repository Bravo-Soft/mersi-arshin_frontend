import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { mask, maxDate, minDate } from 'constant/dateMasks';

import type { Validate } from 'react-hook-form';
import type { IDataItemWithDates } from 'types/dataItem';

import TextField from '@mui/material/TextField';
import ruLocale from 'date-fns/locale/ru';

interface IDateFieldsProps {
	label: string;
	nameOfKey: keyof Pick<
		IDataItemWithDates,
		'productionDate' | 'verificationDate' | 'dateOfTheNextVerification'
	>;
	readOnly?: boolean;
	validation?:
		| Validate<Date, IDataItemWithDates>
		| Record<string, Validate<Date, IDataItemWithDates>>
		| undefined;
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
				<LocalizationProvider adapterLocale={ruLocale} dateAdapter={AdapterDateFns}>
					<DatePicker
						{...field}
						mask={mask}
						label={label}
						readOnly={readOnly}
						minDate={minDate}
						maxDate={maxDate}
						InputProps={{
							error: Boolean(error),
						}}
						renderInput={params => (
							<TextField
								{...params}
								error={Boolean(error)}
								helperText={error?.message}
								required
								inputProps={{
									...params.inputProps,
									placeholder: 'дд.мм.гггг',
								}}
							/>
						)}
					/>
				</LocalizationProvider>
			)}
		/>
	);
}

export default DateField;
