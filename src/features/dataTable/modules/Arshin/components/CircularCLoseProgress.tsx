import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import StyledCircularCLoseProgressBox from './StyledCircularCLoseProgressBox';

interface Props {
	progress: number;
}

function CircularCloseProgress({ progress }: Props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant='determinate' value={progress} />
			<StyledCircularCLoseProgressBox>
				<Typography variant='caption' component='div' color='text.secondary'>{`${Math.round(
					progress
				)}%`}</Typography>
			</StyledCircularCLoseProgressBox>
		</Box>
	);
}

export default CircularCloseProgress;
