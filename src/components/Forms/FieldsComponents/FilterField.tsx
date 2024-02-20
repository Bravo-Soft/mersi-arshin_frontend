import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};
function FilterField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label='Значение'
					fullWidth
					placeholder='Значение фильтра'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			)}
		/>
	);
}
