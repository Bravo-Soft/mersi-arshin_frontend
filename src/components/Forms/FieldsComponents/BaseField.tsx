import { TextField } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
};

function BaseField<T extends FieldValues>({ control, name, label }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label={label}
					error={Boolean(error)}
					helperText={error?.message ?? ' '}
					InputLabelProps={{ shrink: true }}
					type='text'
				/>
			)}
		/>
	);
}

export default BaseField;
