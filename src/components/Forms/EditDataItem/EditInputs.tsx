import { editFields } from '../fields';
import { useAppSelector } from 'hooks/redux';
import { useFormContext } from 'react-hook-form';
import { useDateValidate } from 'hooks/useDateValidate';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';

import type { IDataItemWithDates } from 'types/dataItem';

import Stack from '@mui/material/Stack';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import TextField from '@mui/material/TextField';

interface IEditInputsProps {
	isWriter: boolean;
}

function EditInputs({ isWriter }: IEditInputsProps): JSX.Element {
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

	const { modifiedEditFields } = useAppSelector(selectedVisibleColumns);

	const rendercol = modifiedEditFields ? modifiedEditFields : editFields;

	const params = useFilterAutocomplete(['name', 'type']);
	// const {} = params;
	console.log('params', params);
	console.log('rendercol[0].label', rendercol[0].key);

	return (
		<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
			{rendercol.map(({ key, label }) => {
				switch (key) {
					case 'productionDate':
						return (
							<DateField
								key={key}
								readOnly={!isWriter}
								nameOfKey={key}
								label={label}
								validation={validation[key]}
							/>
						);
					case 'size':
						return <SizeSelect key={key} readOnly={!isWriter} />;
					default:
						return (
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
								InputProps={{ readOnly: !isWriter }}
								required={key === 'name'}
							/>
						);
				}
			})}
		</Stack>
	);
}

export default EditInputs;
