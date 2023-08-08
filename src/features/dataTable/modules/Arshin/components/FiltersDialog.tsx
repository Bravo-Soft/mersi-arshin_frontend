import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
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
			maxWidth={'xs'}
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
