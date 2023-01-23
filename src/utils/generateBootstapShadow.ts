import type { Palette, Theme } from '@mui/material/styles';

import { alpha } from '@mui/material/styles';

type SelectedPaletteKeys = keyof Pick<
	Palette,
	'primary' | 'secondary' | 'info' | 'error' | 'warning'
>;

export const generateBootstrapShadow = (
	theme: Theme,
	color: SelectedPaletteKeys,
	percentOpatity: number
) => {
	return `${alpha(theme.palette[color].main, percentOpatity)} 0 0 0 0.2rem`;
};
