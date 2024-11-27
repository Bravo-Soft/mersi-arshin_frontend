import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { repairColumns } from '../columns';
import { type ItemRepair } from '../types';

import { dayjsFormatVariant } from 'constant/dateFormat';

export const Repairs = ({ repairs }: { repairs: ItemRepair[] }) => {
	return (
		<>
			<TableRow>
				<TableCell colSpan={6} align='center' sx={{ fontWeight: '700' }}>
					Сведения о ремонте/техническом обслуживании/консервации
				</TableCell>
			</TableRow>
			<TableRow>
				{repairColumns.map((col, idx) => (
					<TableCell colSpan={6 / repairColumns.length} align='center' key={idx}>
						{col}
					</TableCell>
				))}
			</TableRow>
			{repairs.map(({ repareDate, repairType, fio }, idx) => (
				<TableRow key={idx}>
					<TableCell colSpan={6 / repairColumns.length} align='center'>
						{dayjs(repareDate).format(dayjsFormatVariant)}
					</TableCell>
					<TableCell colSpan={6 / repairColumns.length} align='center'>
						{repairType}
					</TableCell>
					<TableCell colSpan={6 / repairColumns.length} align='center'>
						{fio}
					</TableCell>
				</TableRow>
			))}
		</>
	);
};
