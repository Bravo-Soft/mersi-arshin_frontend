import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { Tag } from '../../../constant/tag';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};
function SizeField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field}) => (
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

export default SizeField;
