import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { columnsFilters } from '../../NotificationSettings/data';
import { ColumnFieldProps } from '../hooks/useFilterAction';

type Props = {
	name: `${string}.columnFilter`;
	onChange: (field: ColumnFieldProps) => (event: SelectChangeEvent<string>) => void;
};

function ColumnFilterField({ name, onChange }: Props) {
	const { control } = useFormContext<FieldValues>();

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
						onChange={onChange(field)}
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

export default ColumnFilterField;
