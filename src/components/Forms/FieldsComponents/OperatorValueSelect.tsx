import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import type { INotificationSettings } from '../../../types/notification';
import { operatorsFilters } from '../NotificationSettings/data';
import { OperationFieldProps } from '../NotificationSettings/hooks/useNotificationAction';
import { FormFiltersTypes } from '../NotificationSettings/types';

type Props = {
	name: `subscribedEmails.${number}.emailFilters.${number}.operatorValue`;
	control: Control<INotificationSettings, `subscribedEmails.${number}.emailFilters`>;
	onChange: (field: OperationFieldProps) => (event: SelectChangeEvent<string>) => void;
	operatorValueX: FormFiltersTypes;
};

function OperatorValueSelect({ name, onChange, control, operatorValueX }: Props) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormControl variant='standard' fullWidth>
					<InputLabel id='select-operator-filter-label'>Операторы</InputLabel>
					<Select
						{...field}
						value={field.value}
						id='select-operator-filter'
						labelId='select-operator-filter-label'
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
						{operatorsFilters[operatorValueX].map(({ operatorValue, columnField }) => (
							<MenuItem key={`${operatorValue}_${columnField}`} value={operatorValue}>
								{columnField}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>
	);
}

export default OperatorValueSelect;
