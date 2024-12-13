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
					Сведения о ремонте/техническом обслуживании/консервации{' '}
					{!repairs.length && 'отсутствуют'}
				</TableCell>
			</TableRow>
			{repairs.length ? (
				<>
					<TableRow>
						{repairColumns.map((col, idx) => (
							<TableCell colSpan={6 / repairColumns.length} align='center' key={idx}>
								{col}
							</TableCell>
						))}
					</TableRow>
					{repairs.map(({ modificationDate, editedBy, conditionDescription }, idx) => (
						<TableRow key={idx}>
							<TableCell colSpan={6 / repairColumns.length} align='center'>
								{dayjs(modificationDate).format(dayjsFormatVariant)}
							</TableCell>
							<TableCell colSpan={6 / repairColumns.length} align='center'>
								{conditionDescription}
							</TableCell>
							<TableCell colSpan={6 / repairColumns.length} align='center'>
								{editedBy}
							</TableCell>
						</TableRow>
					))}
				</>
			) : (
				<></>
			)}
		</>
	);
};
