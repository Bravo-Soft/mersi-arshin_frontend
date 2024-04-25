import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { enqueueSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import {
	useEditFiltersMutation,
	useGetFiltersQuery,
	useResetFiltersMutation,
} from '../../arshinTableApiSlice';
import { resetDialogState, selectOpenFilterDialogArshin } from '../../dialogArshinSlice';

import FiltersDialogContent from './FiltersDialogContent';

import { Messages } from 'constant/messages';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IFormFilterArshin } from 'types/arshinIntegration';

function FiltersDialog() {
	const dispatch = useAppDispatch();
	const isOpenFiltersDialog = useAppSelector(selectOpenFilterDialogArshin);

	const { data } = useGetFiltersQuery();
	const [editFilters] = useEditFiltersMutation();
	const [resetFilters] = useResetFiltersMutation();

	const methods = useForm<IFormFilterArshin>({
		values: data,
	});

	const handleClose = () => {
		dispatch(resetDialogState());
	};

	const onSubmit = async (data: IFormFilterArshin) => {
		try {
			await editFilters(data).unwrap();
			handleClose();
			enqueueSnackbar(Messages.ARSHIN_FILTERS_SUCCESSFULLY_EDITED, { variant: 'success' });
		} catch (error) {
			enqueueSnackbar(Messages.FAILED_ARSHIN_FILTERS_EDITED, { variant: 'error' });
		}
	};

	const handleReset = async () => {
		try {
			await resetFilters().unwrap();
			handleClose();
			enqueueSnackbar(Messages.ARSHIN_FILTERS_SUCCESSFULLY_RESET, { variant: 'success' });
		} catch (error) {
			enqueueSnackbar(Messages.FAILED_ARSHIN_FILTERS_RESET, { variant: 'error' });
		}
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
					<DialogTitle>
						Выберите фильтры для поиска
						<IconButton
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
							}}
						>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent>
						<FiltersDialogContent />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleReset}>Сбросить</Button>
						<Button type='submit'>Сохранить</Button>
					</DialogActions>
				</Paper>
			</FormProvider>
		</Dialog>
	);
}

export default FiltersDialog;
