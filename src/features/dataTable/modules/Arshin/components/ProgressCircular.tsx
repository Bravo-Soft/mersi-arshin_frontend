import GetAppIcon from '@mui/icons-material/GetApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from 'react';

import { useMenuActions } from '../hooks/useMenuActions';

function ProgressCircular() {
	const { handleGetDataFromFgis } = useMenuActions();
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
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			{progress > 0 && progress <= 100 ? (
				<CircularProgress size={30} variant='determinate' value={progress} />
			) : (
				<Box height='30px' width='30px' />
			)}
			<Box
				sx={{
					top: '5px',
					left: '5px',
					position: 'absolute',
				}}
			>
				<GetAppIcon color='primary' />
			</Box>
			<Button disabled={progress > 0 && progress < 100} onClick={handleUpdateNow}>
				Получить сейчас
			</Button>
		</Box>
	);
}

export default ProgressCircular;
