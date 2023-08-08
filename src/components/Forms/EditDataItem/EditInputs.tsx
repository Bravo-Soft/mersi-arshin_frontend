import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';

import { editFields } from '../fields';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';
import { useDateValidate } from 'hooks/useDateValidate';
import type { IDataItemWithDates } from 'types/dataItem';

interface IEditInputsProps {
	isReader: boolean;
}

function EditInputs({ isReader }: IEditInputsProps): JSX.Element {
	const { watch } = useFormContext<IDataItemWithDates>();
	const validation = useDateValidate({
		productionDateValue: watch('productionDate'),
		verificationDateValue: watch('verificationDate'),
		dateOfNextVerificationValue: watch('dateOfTheNextVerification'),
	});

	const { modifiedEditFields } = useAppSelector(selectedVisibleColumns);

	const rendercol = modifiedEditFields ? modifiedEditFields : editFields;
	const params = useFilterAutocomplete();
	console.log('rendercol', rendercol);
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
							<AutocompleteField
								key={key}
								name={key}
								label={label}
								required={key === 'name'}
								autocompleteParams={params[key]}
								readOnly={isReader}
							/>
						);
				}
			})}
		</Stack>
	);
}

export default EditInputs;
