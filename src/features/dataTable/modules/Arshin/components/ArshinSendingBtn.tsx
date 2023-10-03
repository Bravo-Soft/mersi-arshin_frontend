import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import { useCallback, useEffect } from 'react';

import { selectBtnVariant, selectProgressArshin, setEventSourceData } from '../eventSourceSlice';
import { useSendingArshin } from '../hooks/useSendingArshin';
import { useServerSentEvent } from '../hooks/useServerSentEvent';

import CircularCLoseProgress from './CircularCLoseProgress';

import { BASE_URL } from 'constant/baseUrl';
import { resetState } from 'features/dataTable/modules/Arshin/eventSourceSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function ArshinSendingBtn() {
	const { handleCancel, handleStart } = useSendingArshin();

	const dispatch = useAppDispatch();
	const btnVariant = useAppSelector(selectBtnVariant);
	const progressArshin = useAppSelector(selectProgressArshin);

	const callBack = useCallback(
		(event: MessageEvent) => {
			const { total, current } = JSON.parse(event.data);

			dispatch(setEventSourceData({ total, current }));
		},
		[dispatch]
	);

	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	useEffect(() => {
		if (progressArshin === 100) dispatch(resetState());
	}, [dispatch, progressArshin]);

	return (
		<>
			{btnVariant ? (
				<Button startIcon={<GetAppIcon color='primary' />} onClick={handleStart}>
					Получить сейчас
				</Button>
			) : (
				<Button
					startIcon={<CircularCLoseProgress progress={progressArshin} />}
					onClick={handleCancel}
				>
					Отмена
				</Button>
			)}
		</>
	);
}

export default ArshinSendingBtn;
