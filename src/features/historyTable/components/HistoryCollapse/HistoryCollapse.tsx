import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import Loader from 'components/Loader';
import { useGetHistoryDataByIdQuery } from 'features/historyTable/historyTableApiSlice';
import { parseHistoryChanges } from 'features/historyTable/utils/parseHistoryChanges';
import { IHistoryItem } from 'types/historyItem';

function HistoryCollapse({ row }: { row: IHistoryItem }): JSX.Element {
	const { data, isLoading } = useGetHistoryDataByIdQuery(row.id);

	const parsedHistory = parseHistoryChanges(data || []);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Box sx={{ padding: 2, maxWidth: '100vw', height: 1, borderRadius: 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Дата изменения</TableCell>
							<TableCell>Внесенные изменения</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{parsedHistory.map(({ action, editedBy, modificationDate, updates }, idx) => (
							<TableRow key={idx}>
								<TableCell>{modificationDate}</TableCell>
								<TableCell>
									<ul>
										{action === 'Создан' && (
											<li>Добавление СИ пользователем {editedBy}</li>
										)}

										{action === 'Обновлен' &&
											updates.map(({ field, oldValue, newValue }, idx) => (
												<li key={idx}>
													{editedBy} изменил <b>{field}</b> с <b>{oldValue}</b> на{' '}
													<b>{newValue}</b>
												</li>
											))}
									</ul>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</>
	);
}
export default HistoryCollapse;
