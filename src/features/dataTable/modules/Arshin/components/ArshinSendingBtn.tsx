import GetAppIcon from '@mui/icons-material/GetApp';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useCallback, useEffect } from 'react';

import { selectNotIsDoneArshin } from '../arshinTableSlice';
import {
	selectIsStartArshin,
	selectProcess,
	selectProgressArshin,
	setEventSourceData,
} from '../eventSourceSlice';
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

	const { processed, total } = useAppSelector(selectProcess);
	const processData = useAppSelector(selectNotIsDoneArshin);

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, processed } = JSON.parse(event.data);
			localStorage.setItem('total', total);
			localStorage.setItem('processed', processed);
			dispatch(setEventSourceData({ total, processed }));
		},
		[dispatch]
	);

	console.log('selectNotIsDone,', processData);
	// useEffect(() => {
	// 	const total = Number(localStorage.getItem('total')) ?? 0;
	// 	const processed = Number(localStorage.getItem('processed')) ?? 0;

	// 	dispatch(setEventSourceData({ total, processed }));
	// }, [dispatch]);

	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	// useEffect(() => {
	// 	if (processed === total) {
	// 		dispatch(resetState());
	// 		localStorage.setItem('total', '0');
	// 		localStorage.setItem('processed', '0');
	// 	}
	// }, [dispatch, processed, progressArshin, total]);

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
