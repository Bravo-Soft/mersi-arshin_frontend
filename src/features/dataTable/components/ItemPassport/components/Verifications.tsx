import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { verificationColumns } from '../columns';
import { type ItemVerification } from '../types';

import { dayjsFormatVariant } from 'constant/dateFormat';

export const Verifications = ({ verifications }: { verifications: ItemVerification[] }) => {
	return (
		<>
			<TableRow>
				<TableCell colSpan={6} align='center' sx={{ fontWeight: '700' }}>
					Результат метрологических работ (МР)
				</TableCell>
			</TableRow>
			<TableRow>
				{verificationColumns.map((col, idx) => (
					<TableCell key={idx} align='center'>
						{col}
					</TableCell>
				))}
			</TableRow>
			{verifications.map(
				({ verificationDate, workType, document, organization, resolution, fio }, idx) => (
					<TableRow key={idx}>
						<TableCell align='center'>
							{dayjs(verificationDate).format(dayjsFormatVariant)}
						</TableCell>
						<TableCell align='center'>{workType}</TableCell>
						<TableCell align='center'>{document}</TableCell>
						<TableCell align='center'>{organization}</TableCell>
						<TableCell align='center'>{resolution}</TableCell>
						<TableCell align='center'>{fio}</TableCell>
					</TableRow>
				)
			)}
		</>
	);
};
