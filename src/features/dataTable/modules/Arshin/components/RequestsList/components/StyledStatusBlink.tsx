import { Box, keyframes, styled } from '@mui/material';

import { REQUEST_STATUS } from 'types/arshinIntegration';

type Props = {
	status: REQUEST_STATUS;
};

const getStatusColor = (status: REQUEST_STATUS) =>
	status === REQUEST_STATUS.PROCESS
		? '#014E5F'
		: status === REQUEST_STATUS.READY
		? '#2b9269'
		: '#d52929';

const blink = (status: REQUEST_STATUS) =>
	status === REQUEST_STATUS.STOP
		? ''
		: keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 10px getStatusColor(status), 0 0 20px getStatusColor(status);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 5px getStatusColor(status);
  }
`;

export const StyledStatusBlink = styled(Box, {
	shouldForwardProp: prop => prop !== 'status',
})<Props>(({ theme, status }) => ({
	width: '5px',
	height: '5px',
	borderRadius: '50%',
	backgroundColor: getStatusColor(status),
	boxShadow: `0 0 10px ${getStatusColor(status)}`,
	animation: `${blink(status)} 2s infinite`,
}));
