import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { FormProvider, useForm } from 'react-hook-form';

import { closeFilterDialogArshin, selectOpenFilterDialogArshin } from '../dialogArshinSlice';

import FiltersDialogContent from './FiltersDialogContent';

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
			maxWidth='sm'
			fullWidth
		>
			<FormProvider {...methods}>
				<Paper component='form' onSubmit={methods.handleSubmit(onSubmit)}>
					<DialogTitle>Выберите фильтра для поиска</DialogTitle>
					<DialogContent>
						<FiltersDialogContent />
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
