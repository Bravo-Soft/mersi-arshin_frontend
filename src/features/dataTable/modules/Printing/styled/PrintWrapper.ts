import { styled } from '@mui/material/styles';
import { sidebarWidth } from 'constant/sidebarWidth';

interface IPrintWrapperProps {
	sidebarIsOpen: boolean;
}

const PrintWrapper = styled('div')<IPrintWrapperProps>(({ theme, sidebarIsOpen }) => ({
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	backgroundColor: theme.palette.background.paper,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	margin: `0 ${theme.spacing(3)}`,

	...(sidebarIsOpen && {
		marginRight: `calc(${theme.spacing(3)} + ${sidebarWidth}px)`,
	}),

	transition: theme.transitions.create('all', {
		easing: theme.transitions.easing.sharp,
	}),
}));

export default PrintWrapper;
