import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';

import PassportTable from './components/PassportTable';
import { usePassport } from './hooks/usePassport';

import ExcelIcon from 'features/dataTable/modules/Export/ExcelIcon';

function ItemPassport(): JSX.Element {
	const {
		isLoading,
		passportPrintRef,
		open,
		handlePrint,
		handleClosePassport,
		exportPassportToXslx,
	} = usePassport();

	return (
		<Dialog open={open} onClose={handleClosePassport} fullWidth maxWidth={'lg'}>
			<DialogTitle display={'flex'} justifyContent={'space-between'}>
				Паспорт средства измерения
				<Box display={'flex'} alignItems={'center'}>
					{!isLoading && (
						<ButtonGroup aria-label='Close' variant='text' size='small'>
							<Button onClick={exportPassportToXslx} startIcon={<ExcelIcon />}>
								Экспорт в XLSX
							</Button>
							<Button onClick={handlePrint} endIcon={<PrintIcon />}>
								Печать
							</Button>
						</ButtonGroup>
					)}
					<IconButton aria-label='Close' onClick={handleClosePassport}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent ref={passportPrintRef}>
				<PassportTable />
			</DialogContent>
		</Dialog>
	);
}

export default ItemPassport;
