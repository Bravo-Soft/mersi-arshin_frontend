import { Box, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
	progress: number;
}

function CircularCLoseProgress({ progress }: Props) {
	return (
		<Box sx={{ position: 'relative' }}>
			<Stack flexDirection='row' alignItems='flex-end'>
				<Typography variant='body1' textOverflow='ellipsis' fontSize='12px'>
					{/* {Math.floor(progress)} */}40
				</Typography>
				<Typography fontSize='9px'>%</Typography>
			</Stack>
			<CircularProgress
				sx={{
					top: '-5px',
					left: '-2px',
					position: 'absolute',
				}}
				size={29}
				variant='determinate'
				value={progress}
			/>
		</Box>
	);
}

export default CircularCLoseProgress;
