import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IHistoryItem } from 'types/historyItem';

function HistoryCollapse({ row }: { row: IHistoryItem }): JSX.Element {
	return (
		<>
			<Box sx={{ padding: 2, maxWidth: '100vw', height: 1, borderRadius: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Редактор</TableCell>
							<TableCell>Действие</TableCell>
							<TableCell>Дата изменения</TableCell>
							<TableCell>Предыдущее значение</TableCell>
							<TableCell>Новое значение</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{row.editedBy}</TableCell>
							<TableCell>{row.action}</TableCell>
							<TableCell>{dayjs(row.modificationDate).format(dayjsFormatVariant)}</TableCell>
							<TableCell>Старое значение</TableCell>
							<TableCell>Не староезначение</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>{row.editedBy}</TableCell>
							<TableCell>{row.action}</TableCell>
							<TableCell>{dayjs(row.modificationDate).format(dayjsFormatVariant)}</TableCell>
							<TableCell>Предыдущее значение</TableCell>
							<TableCell>Новое значение</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Box>
		</>
	);
}
export default HistoryCollapse;
