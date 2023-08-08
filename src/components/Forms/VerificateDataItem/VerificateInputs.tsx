import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

import { verificationFields } from '../fields';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import { useDateValidate } from 'hooks/useDateValidate';
import type { IDataItemWithDates } from 'types/dataItem';
import { getCostRules, getExtendedIntervalRules } from 'utils/getExtendedIntervalRules';

interface IVerificateFieldsProps {
	isReader: boolean;
}

function VerificateFields({ isReader }: IVerificateFieldsProps): JSX.Element {
	const {
		watch,
		formState: { errors },
		register,
	} = useFormContext<IDataItemWithDates>();

	const validation = useDateValidate({
		productionDateValue: watch('productionDate'),
		verificationDateValue: watch('verificationDate'),
		dateOfNextVerificationValue: watch('dateOfTheNextVerification'),
	});

	const { modifiedVerificationFields } = useAppSelector(selectedVisibleColumns);

	const rendercol = modifiedVerificationFields ? modifiedVerificationFields : verificationFields;
	const params = useFilterAutocomplete();

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
				) : key === 'interVerificationInterval' ? (
					<TextField
						key={key}
						{...register('interVerificationInterval', getExtendedIntervalRules())}
						label={label}
						error={Boolean(errors.interVerificationInterval)}
						helperText={errors?.interVerificationInterval?.message}
						InputLabelProps={{ shrink: true }}
						type='number'
					/>
				) : key === 'cost' ? (
					<TextField
						key={key}
						{...register('cost', getCostRules())}
						label={label}
						error={Boolean(errors.cost)}
						helperText={errors?.cost?.message}
						InputLabelProps={{ shrink: true }}
						InputProps={{
							startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
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
