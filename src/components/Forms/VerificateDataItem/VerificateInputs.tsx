import { useAppSelector } from 'hooks/redux';
import { useFormContext } from 'react-hook-form';
import { verificationFields } from '../fields';
import { useDateValidate } from 'hooks/useDateValidate';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';

import type { IDataItemWithDates } from 'types/dataItem';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DateField from 'components/DateField';

interface IVerificateFieldsProps {
	isWriter: boolean;
}

function VerificateFields({ isWriter }: IVerificateFieldsProps): JSX.Element {
	const {
		register,
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

	return (
		<Stack direction='column' px={3.5} pb={3.5} rowGap={1} flexGrow={1}>
			{rendercol.map(({ key, label }) =>
				key === 'verificationDate' || key === 'dateOfTheNextVerification' ? (
					<DateField
						key={key}
						readOnly={!isWriter}
						nameOfKey={key}
						label={label}
						validation={validation[key]}
					/>
				) : (
					<TextField
						{...register(key)}
						key={key}
						autoComplete='off'
						label={label}
						error={Boolean(errors[key])}
						helperText={errors[key]?.message}
						InputLabelProps={{ shrink: true }}
						InputProps={{ readOnly: !isWriter }}
					/>
				)
			)}
		</Stack>
	);
}

export default VerificateFields;
