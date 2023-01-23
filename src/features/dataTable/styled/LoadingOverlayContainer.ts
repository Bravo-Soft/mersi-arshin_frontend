import { alpha, styled } from '@mui/material/styles';

const LoadingOverlayContainer = styled('div')(({ theme }) => ({
	position: 'absolute',
	height: '100%',
	width: '100%',
	zIndex: theme.zIndex.drawer + 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: alpha(theme.palette.background.paper, theme.palette.action.disabledOpacity),
}));

export default LoadingOverlayContainer;
