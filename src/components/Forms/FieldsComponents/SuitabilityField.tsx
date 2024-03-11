import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { ColumnNames } from '../../../constant/columnsName';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};

function SuitabilityField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel shrink={true} id='suitability-id'>
				{ColumnNames.SUITABILITY}
			</InputLabel>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select {...field} labelId='suitability-id'>
						<MenuItem value='false'>Нет</MenuItem>
						<MenuItem value='true'>Да</MenuItem>
					</Select>
				)}
			/>
		</FormControl>
	);
}

export default SuitabilityField;
