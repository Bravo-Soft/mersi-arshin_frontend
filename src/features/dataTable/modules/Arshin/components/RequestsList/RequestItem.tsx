import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { IRequestItem } from 'types/arshinIntegration';

export const RequestItem: React.FC<IRequestItem> = ({
	requestTitle,
	status,
	fieldsDate,
	periodicity,
}) => {
	return (
		<Card sx={{ display: 'flex', background: '#f3f3f3' }}>
			<Box
				sx={{ flexDirection: 'column', width: '100%', cursor: 'pointer' }}
				onClick={() => console.log(1)}
			>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component='div' variant='body1'>
						{requestTitle} - {status}
					</Typography>
					<Typography component='div' variant='caption'>
						Диапазон даты: {dayjs(fieldsDate[0]).format('DD.MM.YYYY')} -{' '}
						{dayjs(fieldsDate[1]).format('DD.MM.YYYY')}
					</Typography>
					<Typography component='div' variant='caption'>
						Периодичность: {periodicity} раз в сутки.
					</Typography>
				</CardContent>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}
			>
				<IconButton aria-label='previous' disabled={status !== 'Отменен'}>
					<PlayArrowIcon sx={{ height: 24, width: 24 }} />
				</IconButton>
				<IconButton aria-label='play/pause'>
					{status === 'В процессе' ? (
						<StopIcon sx={{ height: 24, width: 24 }} />
					) : (
						<DeleteIcon sx={{ height: 24, width: 24 }} />
					)}
				</IconButton>
				<IconButton aria-label='next' disabled={status !== 'Отменен'}>
					{<EditIcon sx={{ height: 24, width: 24 }} />}
				</IconButton>
			</Box>
		</Card>
	);
};
