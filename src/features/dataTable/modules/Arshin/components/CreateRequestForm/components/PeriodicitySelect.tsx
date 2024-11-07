import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';

function PeriodicitySelect(): JSX.Element {
	const { control } = useFormContext();
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel id='select-periodicity'>
				Периодичность отправки запроса в ФГИС "Аршин"
			</InputLabel>
			<Controller
				name='periodicity'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<>
						<Select {...field} labelId='select-periodicity' id='select-periodicity'>
							<MenuItem value={1}>1 раз в сутки</MenuItem>
							<MenuItem value={3}>3 раза в сутки</MenuItem>
							<MenuItem value={5}>5 раз в сутки</MenuItem>
						</Select>
						<FormHelperText>{error?.message ?? ' '}</FormHelperText>
					</>
				)}
			/>
		</FormControl>
	);
}

export default PeriodicitySelect;
