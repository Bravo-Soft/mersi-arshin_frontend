import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { sidebarWidth } from 'constant/sidebarWidth';


const StyledDrawer = styled(Drawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		height: '100%',
		width: sidebarWidth,
		position: 'absolute',
		zIndex: theme.zIndex.appBar - 1,
		borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
		border: `1px solid ${theme.palette.divider}`,
		transition: `${theme.transitions.create('all', {
			easing: theme.transitions.easing.sharp,
		})} !important`,
	},
}));

export default StyledDrawer;
