import TextField from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	placeholder: string;
};
function FilterField<T extends FieldValues>({ name, control, label, placeholder }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label={label}
					fullWidth
					placeholder={placeholder}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			)}
		/>
	);
}

export default FilterField;
