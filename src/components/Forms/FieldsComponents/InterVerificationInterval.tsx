import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { ColumnNames } from '../../../constant/columnsName';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};

function InterVerificationInterval<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			name={name}
			key={name}
			control={control}
			render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
				<TextField
					{...field}
					label={ColumnNames.VERIFICATION_INTERVAL}
					error={Boolean(error)}
					helperText={error?.message ?? ' '}
					inputRef={ref}
					onChange={e => onChange(Number(e.target.value))}
					InputLabelProps={{ shrink: true }}
					type='number'
				/>
			)}
		/>
	);
}

export default InterVerificationInterval;
