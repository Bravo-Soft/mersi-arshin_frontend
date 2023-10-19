import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

function SuitabilitySelect() {
	const { control } = useFormContext<Pick<IDataItemWithDates, 'suitability'>>();

	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel shrink={true} id='suitability-id'>
				{ColumnNames.SUITABILITY}
			</InputLabel>
			<Controller
				name='suitability'
				control={control}
				render={({ field }) => (
					<Select {...field} labelId='suitability-id'>
						<MenuItem value={'false'}>Нет</MenuItem>
						<MenuItem value={'true'}>Да</MenuItem>
					</Select>
				)}
			/>
		</FormControl>
	);
}

export default SuitabilitySelect;
