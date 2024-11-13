import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import PassportTable from './components/PassportTable';
import { useGetPassportData } from './hooks/useGetPassportData';

import { selectIsOpenPassportModal, setPassportModal } from 'features/dataTable/dataTableSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function ItemPassport(): JSX.Element {
	const dispatch = useAppDispatch();

	const open = useAppSelector(selectIsOpenPassportModal);

	const handleClosePassport = () => {
		dispatch(setPassportModal(false));
	};

	return (
		<Dialog open={open} onClose={handleClosePassport} fullWidth maxWidth='lg'>
			<DialogTitle>
				<IconButton
					aria-label='close'
					onClick={handleClosePassport}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				Паспорт данных СИ{' '}
			</DialogTitle>
			<DialogContent>
				<PassportTable />
			</DialogContent>
		</Dialog>
	);
}

export default ItemPassport;
