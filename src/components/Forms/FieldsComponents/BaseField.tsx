import { TextField } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	hText?: boolean;
};

function BaseField<T extends FieldValues>({ control, name, label, hText = true }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label={label}
					error={Boolean(error)}
					helperText={(hText && error?.message) ?? ' '}
					InputLabelProps={{ shrink: true }}
					type='text'
				/>
			)}
		/>
	);
}

export default BaseField;
