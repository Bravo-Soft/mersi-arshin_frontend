import { convertFileSize } from '../convertFileSize';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ISpaceNotificationProps {
	maxSizeOfSpacePerPosition: number;
	occupiedSpace: number;
}

function SpaceNotification({
	maxSizeOfSpacePerPosition,
	occupiedSpace,
}: ISpaceNotificationProps): JSX.Element {
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
			<Typography variant='body2' component='span' color='text.secondary'>
				Свободно {convertFileSize(maxSizeOfSpacePerPosition - occupiedSpace, 2)} МБ
			</Typography>
			<Typography variant='body2' component='span' color='text.secondary'>
				Из доступных {convertFileSize(maxSizeOfSpacePerPosition, 2)} МБ
			</Typography>
		</Stack>
	);
}

export default SpaceNotification;
