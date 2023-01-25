import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

import type { IDataItemWithDates } from 'types/dataItem';
import type { ColumnNames } from 'features/dataTable/columns';
import type { AutocompleteKeysType } from 'components/Forms/hooks/useAutocomplete';

interface IAutocompleteFieldsProps {
	key: AutocompleteKeysType;
	autocompleteParams: string[];
	label: ColumnNames;
	readOnly?: boolean;
}

function AutocompleteField({
	key,
	autocompleteParams,
	label,
	readOnly = false,
}: IAutocompleteFieldsProps): JSX.Element {
	const { control } = useFormContext<IDataItemWithDates>();
	return (
		<Controller
			key={key}
			name={key}
			control={control}
			render={({ field: { onChange, ..._field }, fieldState: { error } }) => (
				<Autocomplete
					freeSolo
					options={autocompleteParams}
					onChange={(_event, value) => {
						onChange(value);
					}}
					renderInput={params => {
						return (
							<TextField
								{...params}
								label={label}
								onChange={onChange}
								error={Boolean(error)}
								helperText={error?.message}
								InputLabelProps={{ shrink: true }}
								InputProps={{ readOnly }}
								required={key === 'name'}
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
