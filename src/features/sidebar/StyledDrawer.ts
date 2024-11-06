import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { sidebarWidth } from 'constant/sidebarWidth';

const StyledDrawer = styled(Drawer)(({ theme, anchor }) => {
	return {
		'& .MuiDrawer-paper': {
			height: '100%',
			width: sidebarWidth,
			position: 'absolute',
			zIndex: theme.zIndex.appBar - 1,
			borderRadius:
				anchor === 'right'
					? `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
					: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
			border: `1px solid ${theme.palette.divider}`,
			transition: `${theme.transitions.create('all', {
				easing:
					anchor === 'right' ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
			})} !important`,
		},
	};
});

export default StyledDrawer;
