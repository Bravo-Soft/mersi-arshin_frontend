import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

function SuitabilitySelect() {
	const { control } = useFormContext<Pick<IDataItemWithDates, 'suitability'>>();

	const handleChange =
		(field: ControllerRenderProps<Pick<IDataItemWithDates, 'suitability'>, 'suitability'>) =>
		(event: SelectChangeEvent<boolean>) => {
			const test: boolean = JSON.parse(event.target.value.toString());
			field.onChange(test);
		};

	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel id='suitability-id'>{ColumnNames.SUITABILITY}</InputLabel>
			<Controller
				name='suitability'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						value={field.value.toString()}
						onChange={handleChange(field)}
						labelId='suitability-id'
					>
						<MenuItem value={'false'}>Нет</MenuItem>
						<MenuItem value={'true'}>Да</MenuItem>
					</Select>
				)}
			/>
		</FormControl>
	);
}

export default SuitabilitySelect;
