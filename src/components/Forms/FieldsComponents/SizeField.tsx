import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Tag } from '../../../constant/tag';
import FormControl from '@mui/material/FormControl';
import { Control, Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};
function SizeField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl variant='standard' fullWidth>
					<InputLabel shrink={true} id='select-operator-filter-label'>
						Значение
					</InputLabel>
					<Select
						{...field}
						id='select-operator-filter'
						labelId='select-operator-filter-label'
					>
						<MenuItem value={Tag.SMALL}>{Tag.SMALL}</MenuItem>
						<MenuItem value={Tag.MEDIUM}>{Tag.MEDIUM}</MenuItem>
						<MenuItem value={Tag.LARGE}>{Tag.LARGE}</MenuItem>
					</Select>
				</FormControl>
			)}
		/>
	);
}

