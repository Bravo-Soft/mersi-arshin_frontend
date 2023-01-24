import { useAppSelector } from 'hooks/redux';
import { Controller, useFormContext } from 'react-hook-form';
import { verificationFields } from '../fields';
import { useDateValidate } from 'hooks/useDateValidate';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';

import type { IDataItemWithDates } from 'types/dataItem';

import { Autocomplete } from '@mui/material';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import type { AutocompleteKeysType } from '../hooks/useAutocomplete';

import Stack from '@mui/material/Stack';
import DateField from 'components/DateField';
import TextField from '@mui/material/TextField';
interface IVerificateFieldsProps {
	isReader: boolean;
}

const fieldParams: AutocompleteKeysType[] = [
	'typeOfWork',
	'stateRegister',
	'certificate',
	'organization',
];

function VerificateFields({ isReader }: IVerificateFieldsProps): JSX.Element {
	const {
		register,
		control,
		watch,
		formState: { errors },
	} = useFormContext<IDataItemWithDates>();
	const validation = useDateValidate({
		productionDateValue: watch('productionDate'),
		verificationDateValue: watch('verificationDate'),
		dateOfNextVerificationValue: watch('dateOfTheNextVerification'),
	});

	const { modifiedVerificationFields } = useAppSelector(selectedVisibleColumns);

	const rendercol = modifiedVerificationFields ? modifiedVerificationFields : verificationFields;
	const params = useFilterAutocomplete(fieldParams);

	return (
		<Stack direction='column' px={3.5} pb={3.5} rowGap={1} flexGrow={1}>
			{rendercol.map(({ key, label }) =>
				key === 'verificationDate' || key === 'dateOfTheNextVerification' ? (
					<DateField
						key={key}
						readOnly={isReader}
						nameOfKey={key}
						label={label}
						validation={validation[key]}
					/>
				) : Boolean(params[key]) ? (
					<Controller
						key={key}
						name={key}
						rules={{ required: key === 'name' }}
						control={control}
						render={({ field: { onChange, ..._field } }) => (
							<Autocomplete
								freeSolo
								options={params[key]}
								onChange={(event, value) => {
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
										/>
									);
								}}
								{..._field}
							/>
						)}
					/>
				) : (
					<TextField
						{...register(key, {
							required: key === 'name' ? 'Это поле обязательное' : undefined,
						})}
						key={key}
						autoComplete='off'
						label={label}
						error={Boolean(errors[key])}
						helperText={errors[key]?.message}
						InputLabelProps={{ shrink: true }}
						// InputProps={{ readOnly: isReader }}
					/>
				)
			)}
		</Stack>
	);
}

export default VerificateFields;
