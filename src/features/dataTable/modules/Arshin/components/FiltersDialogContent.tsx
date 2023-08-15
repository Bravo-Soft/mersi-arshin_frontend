import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useFormContext } from 'react-hook-form';

import { configAdditional, configMain } from '../config/filterConfig';

import { IFormFilterArshin } from 'types/arshinIntegration';

const FiltersDialogContent = () => {
	const { control } = useFormContext<IFormFilterArshin>();
	return (
		<>
			<Stack
				direction='row'
				divider={<Divider orientation='vertical' flexItem />}
				spacing={2}
				mb={3}
			>
				<Box width='50%'>
					<Typography fontWeight='500' mb={2}>
						Обязательные
					</Typography>
					{configMain.map(el => (
						<Box key={el.name}>
							<FormControlLabel
								control={
									<Controller
										control={control}
										name={el.name}
										render={({ field }) => (
											<Checkbox
												{...field}
												disabled={el.disabled}
												checked={field.value}
											/>
										)}
									/>
								}
								label={el.title}
							/>
						</Box>
					))}
				</Box>
				<Box width='50%'>
					<Typography fontWeight='500' mb={2}>
						Пользовательские
					</Typography>
					{configAdditional.map(el => (
						<Box key={el.name}>
							<FormControlLabel
								control={
									<Controller
										control={control}
										name={el.name}
										render={({ field }) => (
											<Checkbox
												{...field}
												disabled={el.disabled}
												checked={field.value}
											/>
										)}
									/>
								}
								label={el.title}
							/>
						</Box>
					))}
				</Box>
			</Stack>
			<Controller
				control={control}
				name='period'
				render={({ field }) => (
					<FormControl fullWidth>
						<InputLabel id='select-label'>
							Периодичность отправки запроса в ФГИС «Аршин»
						</InputLabel>
						<Select
							{...field}
							labelId='select-label'
							label='Периодичность отправки запроса в ФГИС «Аршин»'
						>
							<MenuItem value={1}>1 раз в 4 часа</MenuItem>
							<MenuItem value={2}>1 раз в 6 часов</MenuItem>
							<MenuItem value={3}>1 раз в сутки</MenuItem>
						</Select>
					</FormControl>
				)}
			/>
		</>
	);
};

export default FiltersDialogContent;
