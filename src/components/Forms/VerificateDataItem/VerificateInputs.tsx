import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';

import { verificationFields } from '../fields';
import BaseField from '../FieldsComponents/BaseField';
import CostFilterField from '../FieldsComponents/CostFilterField';
import InterVerificationInterval from '../FieldsComponents/InterVerificationInterval';
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
	const { control } = useFormContext<IDataItemWithDates>();

	const { modifiedVerificationFields } = useAppSelector(selectedVisibleColumns);

	const renderColumns = modifiedVerificationFields
		? modifiedVerificationFields
		: verificationFields;
	const params = useFilterAutocomplete();

	return (
		<Stack direction='column' px={3.5} pb={3.5} flexGrow={1}>
			{renderColumns.map(({ key, label }) => {
				switch (key) {
					case 'verificationDate':
					case 'dateOfTheNextVerification':
						return <DateField key={key} readOnly={isReader} nameOfKey={key} label={label} />;
					case 'interVerificationInterval':
						return <InterVerificationInterval name={key} control={control} key={key} />;
					case 'suitability':
						return <SuitabilitySelect key={key} />;
					case 'cost':
						return <CostFilterField key={key} control={control} name={key} />;
					default:
						return (
							<AutocompleteField
								key={key}
								name={key}
								label={label}
								autocompleteParams={params[key]}
								readOnly={isReader}
							/>
						);
				}
			})}
		</Stack>
	);
}

export default VerificateFields;
