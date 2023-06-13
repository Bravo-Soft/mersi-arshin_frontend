
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { convertFileSize } from '../convertFileSize';
import { useLinearProgress } from '../hooks/useLinearProgress';

export interface ISpaceNotificationProps {
	maxSizeOfSpacePerPosition: number;
	occupiedSpace: number;
}

function SpaceNotification({
	maxSizeOfSpacePerPosition,
	occupiedSpace,
}: ISpaceNotificationProps): JSX.Element {
	const { progressStatus, valueProgress } = useLinearProgress({
		occupiedSpace,
		maxSizeOfSpacePerPosition,
	});

	return (
		<Stack
			direction='row'
			justifyContent='space-between'
			sx={{
				mx: 1.5,
				'& .MuiTypography-root': {
					lineHeight: 2.2,
				},
			}}
		>
			<Box width={1}>
				<Typography variant='body2' color='text.secondary'>
					Использовано {convertFileSize(occupiedSpace, 2)} MB из{' '}
					{convertFileSize(maxSizeOfSpacePerPosition, 2)} MB
				</Typography>
				<LinearProgress
					sx={{ my: 1 }}
					variant='determinate'
					value={valueProgress}
					color={progressStatus}
				/>
			</Box>
		</Stack>
	);
}

export default SpaceNotification;
