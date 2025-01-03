import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import { Tag } from 'constant/tag';
import type { IDataItemWithDates } from 'types/dataItem';

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
				render={({ field, fieldState: { error } }) => (
					<>
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
						<FormHelperText>{error?.message ?? ' '}</FormHelperText>
					</>
				)}
			/>
		</FormControl>
	);
}

export default SizeSelect;
