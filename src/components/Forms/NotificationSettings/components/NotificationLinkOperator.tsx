import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import { linkOperators } from '../data';

type Props<T extends FieldValues> = {
	name: `${string}.linkOperator`;
	indexK: number;
};

function NotificationLinkOperator<T extends FieldValues>({ name, indexK }: Props<T>) {
	const { control } = useFormContext<FieldValues>();

	if (indexK === 0) {
		return null;
	}
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormControl variant='standard' size='medium'>
					<Select {...field} value={field.value} disabled={indexK !== 1} sx={{ width: 58 }}>
						{linkOperators.map(({ linkValue, linkTitle }) => (
							<MenuItem key={`${linkValue}_${linkTitle}`} value={linkValue}>
								{linkTitle}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>
	);
}

export default NotificationLinkOperator;
