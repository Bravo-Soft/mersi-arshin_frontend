import { editFields } from '../fields';
import { useAppSelector } from 'hooks/redux';
import { useDateValidate } from 'hooks/useDateValidate';
import { Controller, useFormContext } from 'react-hook-form';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';

import type { IDataItemWithDates } from 'types/dataItem';
import type { AutocompleteKeysType } from '../hooks/useAutocomplete';

import Stack from '@mui/material/Stack';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IEditInputsProps {
	isReader: boolean;
}

export const fieldEditParams: AutocompleteKeysType[] = [
	'name',
	'type',
	'notes',
	'division',
	'condition',
	'accuracyClass',
];

function EditInputs({ isReader }: IEditInputsProps): JSX.Element {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<IDataItemWithDates>();
	const validation = useDateValidate({
		productionDateValue: watch('productionDate'),
		verificationDateValue: watch('verificationDate'),
		dateOfNextVerificationValue: watch('dateOfTheNextVerification'),
	});

	const { modifiedEditFields } = useAppSelector(selectedVisibleColumns);

	const rendercol = modifiedEditFields ? modifiedEditFields : editFields;

	const params = useFilterAutocomplete(fieldEditParams);
	return (
		<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
			{rendercol.map(({ key, label }) => {
				switch (key) {
					case 'productionDate':
						return (
							<DateField
								key={key}
								readOnly={isReader}
								nameOfKey={key}
								label={label}
								validation={validation[key]}
							/>
						);
					case 'size':
						return <SizeSelect key={key} readOnly={isReader} />;
					default:
						return (
							<Controller
								key={key}
								name={key}
								control={control}
								render={({ field: { onChange, ..._field } }) => (
									<Autocomplete
										freeSolo
										options={params[key]}
										onChange={(_event, value) => {
											onChange(value);
										}}
										renderInput={params => {
											return (
												<TextField
													{...params}
													label={label}
													onChange={onChange}
													error={Boolean(errors[key])}
													helperText={errors[key]?.message}
													InputLabelProps={{ shrink: true }}
													// InputProps={{ readOnly: isReader }}
													required={key === 'name'}
												/>
											);
										}}
										{..._field}
									/>
								)}
							/>
						);
				}
			})}
		</Stack>
	);
}

export default EditInputs;
