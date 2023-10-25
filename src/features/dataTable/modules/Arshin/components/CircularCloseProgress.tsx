import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import StyledCircularCloseProgressBox from './StyledCircularCloseProgressBox';

interface Props {
	progress: number;
}

function CircularCloseProgress({ progress }: Props) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress variant='determinate' value={progress} />
			<StyledCircularCloseProgressBox>
				<Typography variant='caption' component='div' color='text.secondary'>{`${Math.round(
					progress
				)}%`}</Typography>
			</StyledCircularCloseProgressBox>
		</Box>
	);
}

export default CircularCloseProgress;
