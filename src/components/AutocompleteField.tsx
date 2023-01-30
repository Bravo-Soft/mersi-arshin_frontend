import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

import type { IDataItemWithDates } from 'types/dataItem';
import type { ColumnNames } from 'features/dataTable/columns';
import type { AutocompleteKeysType } from 'components/Forms/hooks/useAutocomplete';

interface IAutocompleteFieldsProps {
	label: ColumnNames;
	readOnly?: boolean;
	required?: boolean;
	name: AutocompleteKeysType;
	autocompleteParams: string[];
}

function AutocompleteField({
	name,
	label,
	required = false,
	readOnly = false,
	autocompleteParams,
}: IAutocompleteFieldsProps): JSX.Element {
	const { control } = useFormContext<IDataItemWithDates>();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=''
			render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
				<Autocomplete
					freeSolo
					options={autocompleteParams}
					onChange={(_event, value) => {
						onChange(value);
					}}
					readOnly={readOnly}
					renderInput={params => {
						return (
							<TextField
								{...params}
								label={label}
								onChange={onChange}
								error={Boolean(error)}
								helperText={error?.message}
								InputLabelProps={{ shrink: true }}
								required={required}
							/>
						);
					}}
					{..._field}
				/>
			)}
		/>
	);
}

export default AutocompleteField;
