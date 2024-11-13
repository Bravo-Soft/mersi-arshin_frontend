import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { type itemVerification } from '../types';

export const Verifications = ({ verifications }: { verifications: itemVerification[] }) => {
	return (
		<>
			<TableRow>
				<TableCell colSpan={6} align='center' sx={{ fontWeight: '700' }}>
					Результат метрологических работ (МР)
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell align='center' sx={{ maxWidth: '10%' }}>
					Дата проведения МР
				</TableCell>
				<TableCell align='center'>Вид МР</TableCell>
				<TableCell align='center'>Номер документа о проведении МР</TableCell>
				<TableCell align='center'>Организация проведения МР</TableCell>
				<TableCell align='center'>Заключение / Пригодность</TableCell>
				<TableCell align='center'>ФИО ответственного (кто внес)</TableCell>
			</TableRow>
			{verifications.map(
				({ verificationDate, workType, document, organization, resolution, fio }, idx) => (
					<TableRow key={idx}>
						<TableCell align='center'>
							{dayjs(verificationDate).format('DD.MM.YYYY')}
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
