import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import type { AutocompleteKeysType } from 'components/Forms/hooks/useAutocomplete';
import type { ColumnNames } from 'features/dataTable/columns';
import type { IDataItemWithDates } from 'types/dataItem';

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
			render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
				<Autocomplete
					value={value}
					freeSolo
					disableClearable
					options={autocompleteParams}
					onChange={(_event, value) => {
						onChange(value);
					}}
					readOnly={readOnly}
					renderInput={params => (
						<TextField
							{...params}
							label={label}
							onChange={onChange}
							error={Boolean(error)}
							helperText={error?.message}
							inputRef={ref}
							InputLabelProps={{ shrink: true, required: required }}
						/>
					)}
				/>
			)}
		/>
	);
}

export default AutocompleteField;
