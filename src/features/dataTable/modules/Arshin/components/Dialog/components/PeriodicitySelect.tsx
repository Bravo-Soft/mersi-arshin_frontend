import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';

function PeriodicitySelect(): JSX.Element {
	const { control } = useFormContext();
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel id='select-period'>Периодичность отправки запроса в ФГИС "Аршин"</InputLabel>
			<Controller
				name='period'
				control={control}
				render={({ field }) => (
					<>
						<Select {...field} labelId='select-period' id='select-period'>
							<MenuItem value={1}>1 раз в сутки</MenuItem>
							<MenuItem value={2}>1 раз в 4 часа</MenuItem>
							<MenuItem value={3}>1 раз в 6 часов</MenuItem>
						</Select>
					</>
				)}
			/>
		</FormControl>
	);
}

export default PeriodicitySelect;
