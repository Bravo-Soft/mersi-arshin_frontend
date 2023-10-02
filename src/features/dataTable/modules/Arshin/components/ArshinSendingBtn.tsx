import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';

import { useArshinActions } from '../hooks/useArshinActions';

import CircularCLoseProgress from './CircularCLoseProgress';

function ArshinSendingBtn() {
	const { handleGetDataFromFgis } = useArshinActions();
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef<NodeJS.Timer | null>(null);

	// Количество позиций для обновления (для расчета интервала), нужно будет вытащить из кеша
	const items = 3;
	// Количество позиций умноженное на 3 сек(условие Аршина чтобы не положить его) и разделить на 100%
	const interval = (items * 3000) / 100;

	useEffect(() => {
		if (intervalRef.current && progress === 100) {
			clearInterval(intervalRef.current);
			setProgress(0);
			intervalRef.current = null;
		}
		return () => {
			if (intervalRef.current !== null && progress === 100) {
				clearInterval(intervalRef.current);
			}
		};
	}, [progress]);

	const handleUpdateNow = () => {
		if (intervalRef.current !== null) {
			return;
		}
		handleGetDataFromFgis();
		setProgress(1);
		intervalRef.current = setInterval(() => {
			setProgress(prev => (prev += 1));
		}, interval);
	};

	return (
		<>
			<Button startIcon={<GetAppIcon color='primary' />} onClick={handleUpdateNow}>
				Получить сейчас
			</Button>
			<Button
				startIcon={<CircularCLoseProgress progress={progress} />}
				onClick={handleUpdateNow}
			>
				Отмена
			</Button>
		</>
	);
}

export default ArshinSendingBtn;
