import Stack from '@mui/material/Stack';

import { editFields } from '../fields';
import { useFilterAutocomplete } from '../hooks/useAutocomplete';

import AutocompleteField from 'components/AutocompleteField';
import DateField from 'components/DateField';
import SizeSelect from 'components/SizeSelect';
import { selectedVisibleColumns } from 'features/dataTable/dataTableSlice';
import { useAppSelector } from 'hooks/redux';

interface IEditInputsProps {
	isReader: boolean;
}

function EditInputs({ isReader }: IEditInputsProps): JSX.Element {
	const { modifiedEditFields } = useAppSelector(selectedVisibleColumns);

	const renderColumns = modifiedEditFields ? modifiedEditFields : editFields;

	const params = useFilterAutocomplete();
	return (
		<Stack direction='column' px={3} pb={3.5} rowGap={1} flexGrow={1}>
			{renderColumns.map(({ key, label }) => {
				switch (key) {
					case 'productionDate':
						return <DateField key={key} readOnly={isReader} nameOfKey={key} label={label} />;
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
