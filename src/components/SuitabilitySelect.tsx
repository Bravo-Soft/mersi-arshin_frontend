import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';

import { ColumnNames } from 'constant/columnsName';
import type { IDataItemWithDates } from 'types/dataItem';

type Props = {
	hasHelperText?: boolean;
};

function SuitabilitySelect({ hasHelperText = true }: Props) {
	const { control } = useFormContext<Pick<IDataItemWithDates, 'suitability'>>();

	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel shrink={true} id='suitability-id'>
				{ColumnNames.SUITABILITY}
			</InputLabel>
			<Controller
				name='suitability'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<>
						<Select {...field} labelId='suitability-id'>
							<MenuItem value='false'>Нет</MenuItem>
							<MenuItem value='true'>Да</MenuItem>
						</Select>
						{hasHelperText && <FormHelperText>{error?.message ?? ' '}</FormHelperText>}
					</>
				)}
			/>
		</FormControl>
	);
}

export default SuitabilitySelect;
