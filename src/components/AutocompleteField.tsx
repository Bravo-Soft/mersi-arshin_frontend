import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import type { AutocompleteKeysType } from 'components/Forms/hooks/useAutocomplete';
import type { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

interface IAutocompleteFieldsProps {
	label: ColumnNames;
	readOnly?: boolean;
	required?: boolean;
	name: AutocompleteKeysType;
	autocompleteParams: string[];
}

const shortKeys = [
	'type',
	'factoryNumber',
	'inventoryNumber',
	'division',
	'typeOfWork',
	'measurementLimit',
	'location',
	'responsible',
	'suitability',
];

const getValueOfMaxLength = (name: AutocompleteKeysType) => {
	if (shortKeys.includes(name)) {
		return {
			value: 128,
			message: 'Максимальное значение в поле 128 символов',
		};
	} else {
		return {
			value: 256,
			message: 'Максимальное значение в поле 256 символов',
		};
	}
};

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
			rules={{
				required: required && 'Поле обязательное',
				maxLength: getValueOfMaxLength(name),
			}}
			render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
				<Autocomplete
					{...rest}
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
							InputLabelProps={{ shrink: true, required: required }}
						/>
					)}
				/>
			)}
		/>
	);
}

export default AutocompleteField;
