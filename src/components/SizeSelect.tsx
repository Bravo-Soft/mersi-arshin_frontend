import type { IDataItemWithDates } from 'types/dataItem';

import { ColumnNames } from 'features/dataTable/columns';
import { Controller, useFormContext } from 'react-hook-form';
import { Tag } from 'constant/tag';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface ISizeSelectProps {
	readOnly?: boolean;
}

function SizeSelect({ readOnly }: ISizeSelectProps): JSX.Element {
	const { control } = useFormContext<Pick<IDataItemWithDates, 'size'>>();
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel id='select-size-of-label'>{ColumnNames.SIZE}</InputLabel>
			<Controller
				name='size'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						labelId='select-size-of-label'
						id='select-size'
						readOnly={readOnly}
					>
						<MenuItem value={Tag.SMALL}>{Tag.SMALL}</MenuItem>
						<MenuItem value={Tag.MEDIUM}>{Tag.MEDIUM}</MenuItem>
						<MenuItem value={Tag.LARGE}>{Tag.LARGE}</MenuItem>
					</Select>
				)}
			/>
		</FormControl>
	);
}

export default SizeSelect;
