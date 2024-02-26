import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { ColumnNames } from '../../../constant/columnsName';

type Props<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
};

function CostFilterField<T extends FieldValues>({ name, control }: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label={ColumnNames.COST}
					InputLabelProps={{ shrink: true }}
					InputProps={{
						startAdornment: <InputAdornment position='start'>₽</InputAdornment>,
					}}
					error={Boolean(error)}
					helperText={error?.message ?? ' '}
					inputProps={{
						step: 0.01,
					}}
					type='number'
				/>
			)}
		/>
	);
}

export default CostFilterField;
