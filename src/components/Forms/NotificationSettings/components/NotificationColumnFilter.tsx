import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { columnsFilters } from '../data';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	// control: Control<T>;
	onChange: (field: (...event: unknown[]) => void) => (event: SelectChangeEvent<string>) => void;
};

function NotificationColumnFilter<T extends FieldValues>({ name, onChange }: Props<T>) {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormControl variant='standard' fullWidth>
					<InputLabel id='select-date-of-sending-label'>Столбцы</InputLabel>
					<Select
						{...field}
						value={field.value}
						id='select-column-filter'
						labelId='select-column-filter-label'
						onChange={onChange(field.onChange)}
						fullWidth
						MenuProps={{
							PaperProps: {
								sx: {
									maxHeight: 200,
								},
							},
						}}
					>
						{columnsFilters.map(({ field, headerName }) => (
							<MenuItem key={`${field}_${headerName}`} value={field}>
								{headerName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>
	);
}

export default NotificationColumnFilter;
