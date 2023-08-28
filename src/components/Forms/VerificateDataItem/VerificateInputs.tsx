import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

import { verificationFields } from '../fields';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItemWithDates } from 'types/dataItem';

interface IVerificateFieldsProps {
	isReader: boolean;
}

function VerificateFields({ isReader }: IVerificateFieldsProps): JSX.Element {
	const {
		formState: { errors },
		register,
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
					<TextField
						key={key}
						{...register('interVerificationInterval')}
						label={label}
						error={Boolean(errors.interVerificationInterval)}
						helperText={errors?.interVerificationInterval?.message}
						InputLabelProps={{ shrink: true }}
						type='number'
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
