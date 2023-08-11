import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import config from '../config/filterConfig';
import { closeFilterDialogArshin, selectOpenFilterDialogArshin } from '../filtersDialogSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IFormFilterArshin } from 'types/arshinIntegration';

function FiltersDialog() {
	const dispatch = useAppDispatch();
	const isOpenFiltersDialog = useAppSelector(selectOpenFilterDialogArshin);

	const methods = useForm<IFormFilterArshin>({
		defaultValues: {
			organization: true,
			type: true,
			factoryNumber: true,
			verificationDate: true,
			dateOfTheNextVerification: true,
			certificate: true,
			suitability: true,
			period: 1,
		},
	});

	const handleClose = () => {
		dispatch(closeFilterDialogArshin());
	};

	const onSubmit = (data: IFormFilterArshin) => {
		console.log(data);
		handleClose();
		methods.reset();
	};

	return (
		<Dialog
			PaperProps={{
				variant: 'elevation',
			}}
			open={isOpenFiltersDialog}
			onClose={handleClose}
			maxWidth='xs'
			fullWidth
		>
			<FormProvider {...methods}>
				<Paper component='form' onSubmit={methods.handleSubmit(onSubmit)}>
					<DialogTitle>Выберите фильтра для поиска</DialogTitle>
					<DialogContent>
						{config.map(el => (
							<Box key={el.name}>
								<FormControlLabel
									control={
										<Controller
											control={methods.control}
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
						<Controller
							control={methods.control}
							name='period'
							render={({ field }) => (
								<FormControl fullWidth sx={{ marginTop: 2 }}>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Закрыть</Button>
						<Button type='submit'>Сохранить</Button>
					</DialogActions>
				</Paper>
			</FormProvider>
		</Dialog>
	);
}

export default FiltersDialog;
