import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useArshinActions } from '../hooks/useArshinActions';
import { useSendingArshin } from '../hooks/useSendingArshin';
import { useServerSentEvent } from '../hooks/useServerSentEvent';

import CircularCLoseProgress from './CircularCLoseProgress';

import { BASE_URL } from 'constant/baseUrl';

function ArshinSendingBtn() {
	// const { handleGetDataFromFgis } = useArshinActions();
	// const [progress, setProgress] = useState(0);
	// const intervalRef = useRef<NodeJS.Timer | null>(null);

	// // Количество позиций для обновления (для расчета интервала), нужно будет вытащить из кеша
	// const items = 3;
	// // Количество позиций умноженное на 3 сек(условие Аршина чтобы не положить его) и разделить на 100%
	// const interval = (items * 3000) / 100;

	// useEffect(() => {
	// 	if (intervalRef.current && progress === 100) {
	// 		clearInterval(intervalRef.current);
	// 		setProgress(0);
	// 		intervalRef.current = null;
	// 	}
	// 	return () => {
	// 		if (intervalRef.current !== null && progress === 100) {
	// 			clearInterval(intervalRef.current);
	// 		}
	// 	};
	// }, [progress]);

	// const handleUpdateNow = () => {
	// 	if (intervalRef.current !== null) {
	// 		return;
	// 	}
	// 	handleGetDataFromFgis();
	// 	setProgress(1);
	// 	intervalRef.current = setInterval(() => {
	// 		setProgress(prev => (prev += 1));
	// 	}, interval);
	// };

	const { handleCancel, handleStart } = useSendingArshin();

	const [totlaProgress, setTotalProgress] = useState<number>(0);

	const callBack = (event: MessageEvent) => {
		const x = JSON.parse(event.data);
		console.log('event.data', event.data);

		setTotalProgress((x.current / x.total) * 100);
	};

	//current / total
	useServerSentEvent(`${BASE_URL}/api/user/modules/arshin/notifications`, callBack);

	useEffect(() => {
		console.log('totlaProgress', totlaProgress);
	}, [totlaProgress]);

	return (
		<>
			<Button startIcon={<GetAppIcon color='primary' />} onClick={handleStart}>
				Получить сейчас
			</Button>
			<Button
				startIcon={<CircularCLoseProgress progress={totlaProgress} />}
				onClick={handleCancel}
			>
				Отмена
			</Button>
		</>
	);
}

export default ArshinSendingBtn;
