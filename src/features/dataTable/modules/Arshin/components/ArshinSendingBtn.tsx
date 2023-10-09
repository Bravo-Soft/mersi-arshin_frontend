import GetAppIcon from '@mui/icons-material/GetApp';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

import { selectNotIsDoneArshin } from '../arshinTableSlice';
import { selectIsStartArshin, selectProgressArshin } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';

import CircularCLoseProgress from './CircularCLoseProgress';

import { useAppSelector } from 'hooks/redux';

function ArshinSendingBtn() {
	const { handleCancel, handleStart } = useSendingArshin();
	const isStart = useAppSelector(selectIsStartArshin);
	const progressArshin = useAppSelector(selectProgressArshin);

	const processData = useAppSelector(selectNotIsDoneArshin);
	return (
		<>
			{!isStart ? (
				<Button
					disabled={!processData.length}
					startIcon={<GetAppIcon color='primary' />}
					onClick={handleStart}
				>
					Получить сейчас
				</Button>
			) : (
				<Stack flexDirection='row' alignItems='center' gap={1}>
					<CircularCLoseProgress progress={progressArshin} />
					<Button onClick={handleCancel}>Отмена</Button>
				</Stack>
			)}
		</>
	);
}

export default ArshinSendingBtn;
