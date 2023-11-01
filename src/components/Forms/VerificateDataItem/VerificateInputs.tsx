import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { verificationFields } from '../fields';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import SuitabilitySelect from 'components/SuitabilitySelect';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItemWithDates } from 'types/dataItem';

interface IVerificateFieldsProps {
	isReader: boolean;
}

function VerificateFields({ isReader }: IVerificateFieldsProps): JSX.Element {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<IDataItemWithDates>();

	const { modifiedVerificationFields } = useAppSelector(selectedVisibleColumns);

	const renderColumns = modifiedVerificationFields
		? modifiedVerificationFields
		: verificationFields;
	const params = useFilterAutocomplete();

	return (
		<Stack direction='column' px={3.5} pb={3.5} rowGap={1} flexGrow={1}>
			{renderColumns.map(({ key, label }) =>
				key === 'verificationDate' || key === 'dateOfTheNextVerification' ? (
					<DateField key={key} readOnly={isReader} nameOfKey={key} label={label} />
				) : key === 'interVerificationInterval' ? (
					<Controller
						name={key}
						key={key}
						control={control}
						render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
							<TextField
								{...field}
								label={label}
								error={Boolean(error)}
								helperText={error?.message ?? ' '}
								inputRef={ref}
								onChange={e => onChange(Number(e.target.value))}
								InputLabelProps={{ shrink: true }}
								type='number'
							/>
						)}
					/>
				) : key === 'suitability' ? (
					<SuitabilitySelect key={key} />
				) : key === 'cost' ? (
					<TextField
						key={key}
						{...register('cost')}
						label={label}
						error={Boolean(errors.cost)}
						helperText={errors?.cost?.message}
						InputLabelProps={{ shrink: true }}
						InputProps={{
							startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
						}}
						inputProps={{
							step: 0.01,
						}}
						type='number'
					/>
				) : key === 'fgisUrl' ? (
					<TextField
						key={key}
						{...register('fgisUrl')}
						label={label}
						error={Boolean(errors.fgisUrl)}
						helperText={errors?.fgisUrl?.message}
						InputLabelProps={{ shrink: true }}
						type='text'
					/>
				) : (
					<AutocompleteField
						key={key}
						name={key}
						label={label}
						autocompleteParams={params[key]}
						readOnly={isReader}
					/>
				)
			)}
		</Stack>
	);
}

export default VerificateFields;
