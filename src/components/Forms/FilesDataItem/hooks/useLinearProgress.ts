import type { LinearProgressPropsColorOverrides } from '@mui/material';
import type { ISpaceNotificationProps } from '../components/SpaceNotification';
import type { OverridableStringUnion } from '@mui/types';

interface useLinearProgressProps extends ISpaceNotificationProps {}

type TProgressStatus =
	| OverridableStringUnion<
			'error' | 'primary' | 'warning' | 'inherit' | 'secondary' | 'info' | 'success',
			LinearProgressPropsColorOverrides
	  >
	| undefined;

export const useLinearProgress = ({
	maxSizeOfSpacePerPosition,
	occupiedSpace,
}: useLinearProgressProps) => {
	const valueProgress = (occupiedSpace / maxSizeOfSpacePerPosition) * 100;
	const progressStatus: TProgressStatus =
		valueProgress <= 40 ? 'primary' : valueProgress <= 80 ? 'warning' : 'error';

	return {
		valueProgress,
		progressStatus,
	};
};
