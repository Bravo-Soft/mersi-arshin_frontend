import { TableCell, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { type ISummary } from '../types';

import StyledTableRow from 'styled/StyledTableRow';
import StyledTitleTableCell from 'styled/StyledTitleTableCell';

export const Summary = ({ summaryData }: { summaryData: ISummary }) => {
	const {
		passportId,
		name,
		productionDate,
		inventoryNumber,
		startDate,
		type,
		measurementLimit,
		factoryNumber,
		accuracyClass,
		typeOfWork,
		interVerificationInterval,
	} = summaryData;
	return (
		<>
			<TableRow>
				<TableCell colSpan={6} align='center'>
					<Typography variant='h6'>Паспорт № {passportId}</Typography>
				</TableCell>
			</TableRow>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>Наименование</StyledTitleTableCell>
				<TableCell>{name}</TableCell>
				<StyledTitleTableCell colSpan={2}>Дата производства</StyledTitleTableCell>
				<TableCell>{productionDate}</TableCell>
			</StyledTableRow>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>Инвентарный номер</StyledTitleTableCell>
				<TableCell>{inventoryNumber}</TableCell>
				<StyledTitleTableCell colSpan={2}>Дата ввода в эксплуатацию</StyledTitleTableCell>
				<TableCell>{startDate}</TableCell>
			</StyledTableRow>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>Тип, модель, марка</StyledTitleTableCell>
				<TableCell>{type}</TableCell>
				<StyledTitleTableCell colSpan={2}>Диапазон измерения</StyledTitleTableCell>
				<TableCell>{measurementLimit}</TableCell>
			</StyledTableRow>
			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>Заводской номер</StyledTitleTableCell>
				<TableCell>{factoryNumber}</TableCell>
				<StyledTitleTableCell colSpan={2}>Класс, разряд, погрешность</StyledTitleTableCell>
				<TableCell>{accuracyClass}</TableCell>
			</StyledTableRow>

			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>
					Вид метрологических работ {'(МР)'}
				</StyledTitleTableCell>
				<TableCell colSpan={4} sx={{ color: '#014E5F', fontWeight: 'bold' }}>
					{typeOfWork}
				</TableCell>
			</StyledTableRow>

			<StyledTableRow>
				<StyledTitleTableCell colSpan={2}>
					Периодичность метрологических работ {'(МР)'}
				</StyledTitleTableCell>
				<TableCell colSpan={4} sx={{ color: '#014E5F', fontWeight: 'bold' }}>
					{interVerificationInterval} мес.
				</TableCell>
			</StyledTableRow>

			{/* <StyledTableRow>
				<TableCell colSpan={4} sx={{ color: '#014E5F', fontWeight: 'bold' }}>
					12 мес. с 01.01.2021
				</TableCell>
			</StyledTableRow> */}

			<StyledTableRow>
				<TableCell
					colSpan={6}
					sx={{
						color: '#014E5F',
						fontWeight: 'bold',
						background: '#014E5F',
					}}
				/>
			</StyledTableRow>
		</>
	);
};
