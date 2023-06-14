import type { SxProps, Theme } from '@mui/material';

import { hideScrollbar } from 'utils/hideScrollbar';

export const scrollbarStyles: SxProps<Theme> = {
	overflowX: 'scroll',
	scrollbarWidth: 'none',
	...hideScrollbar(),
};
