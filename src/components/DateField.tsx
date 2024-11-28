import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

import type { IDataItemWithDates } from 'types/dataItem';

interface IDateFieldsProps {
	label: string;
	nameOfKey: keyof Pick<
		IDataItemWithDates,
		'productionDate' | 'verificationDate' | 'dateOfTheNextVerification' | 'dateOfCommissioning'
	>;
	readOnly?: boolean;
}

function DateField({ label, nameOfKey, readOnly }: IDateFieldsProps): JSX.Element {
	const { control } = useFormContext<IDataItemWithDates>();

	return (
		<Controller
			control={control}
			name={nameOfKey}
			render={({ field: { ref, ...field }, fieldState: { error } }) => (
				<DatePicker
					{...field}
					label={label}
					readOnly={readOnly}
					slotProps={{
						textField: {
							inputRef: ref,
							error: Boolean(error),
							helperText: error?.message ?? ' ',
						},
					}}
				/>
			)}
		/>
	);
}

export default DateField;
