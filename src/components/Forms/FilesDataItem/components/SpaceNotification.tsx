import { convertFileSize } from '../convertFileSize';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

interface ISpaceNotificationProps {
	maxSizeOfSpacePerPosition: number;
	occupiedSpace: number;
}

function SpaceNotification({
	maxSizeOfSpacePerPosition,
	occupiedSpace,
}: ISpaceNotificationProps): JSX.Element {
	const valueProgress = (occupiedSpace / maxSizeOfSpacePerPosition) * 100;
	const colorProgress =
		valueProgress <= 40 ? 'primary' : valueProgress <= 80 ? 'warning' : 'error';
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
					color={colorProgress}
				/>
			</Box>
		</Stack>
	);
}

export default SpaceNotification;
