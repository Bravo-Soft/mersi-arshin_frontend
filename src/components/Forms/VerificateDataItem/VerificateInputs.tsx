import { useAppSelector } from 'hooks/redux';
import { verificationFields } from '../fields';
import { useDateValidate } from 'hooks/useDateValidate';
import { useFormContext } from 'react-hook-form';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { getExtendedIntervalRules } from 'utils/getExtendedIntervalRules';

import type { IDataItemWithDates } from 'types/dataItem';

import Stack from '@mui/material/Stack';
import DateField from 'components/DateField';
import AutocompleteField from 'components/AutocompleteField';
import TextField from '@mui/material/TextField';

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
				) : key === 'interVerificationinterval' ? (
					<TextField
						{...register('interVerificationinterval', getExtendedIntervalRules())}
						label={label}
						error={Boolean(errors.interVerificationinterval)}
						helperText={errors?.interVerificationinterval?.message}
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
