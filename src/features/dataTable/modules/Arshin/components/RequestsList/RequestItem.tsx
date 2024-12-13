import { Box, Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { useArshinRequests } from '../../hooks/useArshinRequests';
import { periodFormatter } from '../../utils/periodFormatter';

import { ButtonsBlock } from './components/ButtonsBlock';

import { dayjsFormatVariant } from 'constant/dateFormat';
import { IRequestItem, REQUEST_STATUS } from 'types/arshinIntegration';

export const RequestItem: React.FC<IRequestItem> = ({
	creator,
	id,
	name,
	status,
	range,
	period,
	sendEmail,
	dataIds,
}) => {
	const { selectedRequest, handleSelectRequest } = useArshinRequests();

	const statusColor =
		status === REQUEST_STATUS.PROCESS
			? '#014E5F'
			: status === REQUEST_STATUS.READY
			? '#2b92698e'
			: '#d52929';

	const selectRequest = () =>
		handleSelectRequest({
			creator,
			id,
			name,
			status,
			range,
			period,
			sendEmail,
			dataIds,
		});

	return (
		<Card
			sx={{
				display: 'flex',
				background: selectedRequest?.id === id ? 'rgba(1, 78, 95, 0.08)' : '#fff',
			}}
		>
			<Box
				sx={{ flexDirection: 'column', width: '100%', cursor: 'pointer' }}
				onClick={selectRequest}
			>
				<CardContent sx={{ flex: '1 0 auto', py: 1 }}>
					<Box display={'flex'} alignItems={'center'} gap={2}>
						<Typography component='div' variant='body1'>
							{name}
						</Typography>

						<Typography
							component='div'
							variant='body1'
							sx={{ color: statusColor, fontWeight: 'bold' }}
						>
							{status}
						</Typography>
					</Box>

					<Typography component='div' variant='caption'>
						Диапазон даты: {dayjs(range[0]).format(dayjsFormatVariant)} -{' '}
						{dayjs(range[1]).format(dayjsFormatVariant)}
					</Typography>
					<Typography component='div' variant='caption'>
						Периодичность: {periodFormatter(period)}
					</Typography>
					<Typography component='div' variant='caption'>
						Автор: {creator}
					</Typography>
				</CardContent>
			</Box>
			<ButtonsBlock status={status} id={id} handleSelect={selectRequest} />
		</Card>
	);
};
