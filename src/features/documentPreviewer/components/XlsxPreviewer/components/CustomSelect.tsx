import { type SelectChangeEvent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import type { SelectableValues } from '../types/selectableValues';

interface ICustomSelect {
	label: string;
	values: SelectableValues;
	value: string;
	handleChangeValue: (event: SelectChangeEvent) => void;
	defaultValue: string;
}

export function CustomSelect({
	label,
	values,
	value,
	handleChangeValue,
	defaultValue,
}: ICustomSelect) {
	return (
		<FormControl sx={{ m: 1, minWidth: 250 }}>
			<InputLabel id={`${value}-label`}>{label}</InputLabel>
			<Select
				labelId={`${value}-label`}
				id={`${value}`}
				defaultValue={defaultValue}
				value={
					value === undefined || value === null || Object.keys(values).length === 0
						? ''
						: value
				}
				label={label}
				autoWidth
				onChange={handleChangeValue}
			>
				{Object.keys(values).map(key => (
					<MenuItem key={values[key].name} value={values[key].value}>
						{values[key].name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
