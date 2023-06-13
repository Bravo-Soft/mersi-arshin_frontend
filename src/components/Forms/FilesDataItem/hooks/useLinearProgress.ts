import type { LinearProgressProps } from '@mui/material';

import type { ISpaceNotificationProps } from '../components/SpaceNotification';

type IUseLinearProgressProps = ISpaceNotificationProps

type ProgressStatus = Extract<LinearProgressProps['color'], 'primary' | 'warning' | 'error'>;

export const useLinearProgress = ({
	maxSizeOfSpacePerPosition,
	occupiedSpace,
}: IUseLinearProgressProps) => {
	const valueProgress = (occupiedSpace / maxSizeOfSpacePerPosition) * 100;
	const progressStatus: ProgressStatus =
		valueProgress <= 40 ? 'primary' : valueProgress <= 80 ? 'warning' : 'error';

	return {
		valueProgress,
		progressStatus,
	};
};
