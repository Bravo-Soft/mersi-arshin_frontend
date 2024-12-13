import { Button } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { AppRoutes } from 'constant/appRoutes';

interface StyledIconButtonProps extends IconButtonProps {
	pathname?: string;
}

const StyledLayoutHistoryButton = styled(Button, {
	shouldForwardProp: prop => prop !== 'pathname',
})<StyledIconButtonProps>(({ theme, pathname }) => ({
	...(pathname === AppRoutes.HISTORY && {
		cursor: 'pointer',
		color: '#fff',
		background: '#ffffff2e',

		':hover': {
			background: '#ffffff2e',
		},
	}),
	...(pathname !== AppRoutes.HISTORY && {
		color: '#fff',
	}),
}));

export default StyledLayoutHistoryButton;
