import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { Control, Controller } from 'react-hook-form';

import type { INotificationSettings } from '../../../../types/notification';
import { columnsFilters } from '../data';
import { ColumnFieldProps } from '../hooks/useNotificationAction';

type Props = {
	name: `subscribedEmails.${number}.emailFilters.${number}.columnFilter`;
	control: Control<INotificationSettings, `subscribedEmails.${number}.emailFilters`>;
	onChange: (field: ColumnFieldProps) => (event: SelectChangeEvent<string>) => void;
};

function NotificationColumnFilter({ name, onChange, control }: Props) {
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

export default NotificationColumnFilter;
