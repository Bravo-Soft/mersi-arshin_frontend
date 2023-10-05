import GetAppIcon from '@mui/icons-material/GetApp';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useCallback, useEffect } from 'react';

import { selectIsStartArshin, selectProgressArshin, setEventSourceData } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';
import { useServerSentEvent } from '../hooks/useServerSentEvent';

import CircularCLoseProgress from './CircularCLoseProgress';

import { BASE_URL } from 'constant/baseUrl';
import { resetState } from 'features/dataTable/modules/Arshin/eventSourceSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function ArshinSendingBtn() {
	const { handleCancel, handleStart } = useSendingArshin();
	const isStart = useAppSelector(selectIsStartArshin);
	const dispatch = useAppDispatch();
	const progressArshin = useAppSelector(selectProgressArshin);

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, processed } = JSON.parse(event.data);
			localStorage.setItem('total', total);
			localStorage.setItem('processed', processed);
			dispatch(setEventSourceData({ total, processed }));
		},
		[dispatch]
	);

	useEffect(() => {
		const total = Number(localStorage.getItem('total')) ?? 0;
		const processed = Number(localStorage.getItem('processed')) ?? 0;

		dispatch(setEventSourceData({ total, processed }));
	}, [dispatch]);

	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	useEffect(() => {
		if (progressArshin === 100) {
			dispatch(resetState());
			localStorage.setItem('total', '0');
			localStorage.setItem('processed', '0');
		}
	}, [dispatch, progressArshin]);

	return (
		<>
			{isStart ? (
				<Button startIcon={<GetAppIcon color='primary' />} onClick={handleStart}>
					Получить сейчас
				</Button>
			) : (
				<Stack flexDirection='row' alignItems='center' gap={2}>
					<CircularCLoseProgress progress={progressArshin} />
					<Button onClick={handleCancel}>Отмена</Button>
				</Stack>
			)}
		</>
	);
}

export default ArshinSendingBtn;
