import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';

import { useStartRequestMutation, useStopRequestMutation } from '../../../arshinTableApiSlice';
import { useArshinRequests } from '../../../hooks/useArshinRequests';

import { IRequestItemWithDates, REQUEST_STATUS } from 'types/arshinIntegration';

export const ButtonsBlock = ({
	id,
	status,
	handleSelect,
}: Pick<IRequestItemWithDates, 'status' | 'id'> & { handleSelect: () => void }) => {
	const [startRequest, { isLoading: isStarting }] = useStartRequestMutation();
	const [stopRequest, { isLoading: isStoping }] = useStopRequestMutation();
	const { handleDeleteRequestItem, handleEditRequest } = useArshinRequests();

	const handleStart = () => {
		startRequest(id);
	};

	const handleStop = () => {
		stopRequest(id);
	};

	const handleDelete = () => {
		handleSelect();
		handleDeleteRequestItem();
	};

	const handleEdit = () => {
		handleSelect();
		handleEditRequest();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'flex-end',
				maxHeight: '70%',
			}}
		>
			<IconButton disabled={status !== REQUEST_STATUS.STOP}>
				{isStarting ? (
					<CircularProgress size={24} />
				) : (
					<Tooltip title='Запустить'>
						<PlayArrowIcon onClick={handleStart} />
					</Tooltip>
				)}
			</IconButton>

			{status === REQUEST_STATUS.PROCESS && (
				<IconButton>
					{isStoping ? (
						<CircularProgress size={24} />
					) : (
						<Tooltip title='Остановить запрос'>
							<StopIcon onClick={handleStop} />
						</Tooltip>
					)}
				</IconButton>
			)}
			{status !== REQUEST_STATUS.PROCESS && (
				<IconButton>
					<Tooltip title='Удалить'>
						<DeleteIcon onClick={handleDelete} />
					</Tooltip>
				</IconButton>
			)}
			<IconButton disabled={status !== REQUEST_STATUS.STOP}>
				<Tooltip title='Редактировать'>
					<EditIcon onClick={handleEdit} />
				</Tooltip>
			</IconButton>
		</Box>
	);
};
