import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
	progress: number;
}

function CircularCLoseProgress({ progress }: Props) {
	return (
		<>
			<CloseIcon color='primary' sx={{ position: 'relative' }} />
			<CircularProgress
				sx={{
					top: '3px',
					left: '0',
					position: 'absolute',
				}}
				size={24}
				variant='determinate'
				value={progress}
			/>
		</>
	);
}

export default CircularCLoseProgress;
