import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { useArshinRequests } from '../../hooks/useArshinRequests';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IRequestItem } from 'types/arshinIntegration';

export const RequestItem: React.FC<IRequestItem> = ({
	author,
	requestId,
	requestTitle,
	status,
	fieldsDate,
	periodicity,
	items,
}) => {
	const { selectedRequest, handleSelectRequest, handleEditRequest, handleDeleteRequestItem } =
		useArshinRequests();

	const statusColor =
		status === 'В процессе' ? '#014E5F' : status === 'Готово' ? '#45a445' : '#d52929';

	const onEditRequest = () => {
		handleSelectRequest({
			author,
			requestId,
			requestTitle,
			status,
			fieldsDate,
			periodicity,
			items,
		});
		handleEditRequest();
	};

	return (
		<Card
			sx={{
				display: 'flex',
				background: selectedRequest?.requestId === requestId ? '#014e5f1e' : '#f3f3f3',
			}}
		>
			<Box
				sx={{ flexDirection: 'column', width: '100%', cursor: 'pointer' }}
				onClick={() =>
					handleSelectRequest({
						author,
						requestId,
						requestTitle,
						status,
						fieldsDate,
						periodicity,
						items,
					})
				}
			>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Box sx={{ display: 'flex' }}>
						<Typography variant='body1'>{requestTitle}</Typography>-
						<Typography
							component='div'
							variant='body1'
							sx={{ color: statusColor, fontWeight: 'bold' }}
						>
							{status}
						</Typography>
					</Box>

					<Typography component='div' variant='caption'>
						Диапазон даты: {dayjs(fieldsDate[0]).format(dayjsFormatVariant)} -{' '}
						{dayjs(fieldsDate[1]).format(dayjsFormatVariant)}
					</Typography>
					<Typography component='div' variant='caption'>
						Периодичность: {periodicity} раз в сутки.
					</Typography>
					<Typography component='div' variant='caption'>
						Автор: {author}
					</Typography>
				</CardContent>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'flex-end',
					maxHeight: '70%',
				}}
			>
				<IconButton aria-label='previous' disabled={status !== 'Отменен'}>
					<Tooltip title='Запустить'>
						<PlayArrowIcon />
					</Tooltip>
				</IconButton>

				<IconButton>
					{status === 'В процессе' ? (
						<Tooltip title='Остановить запрос'>
							<StopIcon />
						</Tooltip>
					) : (
						<Tooltip title='Удалить'>
							<DeleteIcon onClick={handleDeleteRequestItem} />
						</Tooltip>
					)}
				</IconButton>
				<IconButton aria-label='next' disabled={status !== 'Отменен'}>
					<Tooltip title='Редактировать'>
						<EditIcon onClick={onEditRequest} />
					</Tooltip>
				</IconButton>
			</Box>
		</Card>
	);
};
