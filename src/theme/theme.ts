import FontFace from 'utils/fontFace';
import IBMPlexSansMediumPath from './fonts/IBMPlexSans-Medium.woff';
import IBMPlexSansRegularPath from './fonts/IBMPlexSans-Regular.woff';
import QuicksandBoldPath from './fonts/Quicksand-Bold.woff';

import type { IScrollbarParameters } from 'utils/generateScrollbarStyles';

import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid-pro';
import { generateScrollbarStyles } from 'utils/generateScrollbarStyles';

const ibmPlexSansUnicodeRange = 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116';

const IBMPlexSansMedium = new FontFace(
	'IBM Plex Sans',
	'IBMPlexSans-Medium',
	IBMPlexSansMediumPath,
	'woff',
	500,
	'normal',
	'swap',
	ibmPlexSansUnicodeRange
);

const IBMPlexSansRegular = new FontFace(
	'IBM Plex Sans',
	'IBMPlexSans-Regular',
	IBMPlexSansRegularPath,
	'woff',
	400,
	'normal',
	'swap',
	ibmPlexSansUnicodeRange
);
const QuickSandBold = new FontFace(
	'Quicksand',
	'Quicksand-Bold',
	QuicksandBoldPath,
	'woff',
	700,
	'normal',
	'swap',
	'U+041C, U+0415, U+0420, U+0421, U+0418'
);

const fontList = [IBMPlexSansRegular, IBMPlexSansMedium, QuickSandBold];

const defaultStyles = `#root {
	height: 100vh;
	width: 100vw;
};

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
`;

const scrollbarParameters: IScrollbarParameters = {
	borderRadius: '5px',
	scrollbarBgColor: '#f2f2f2',
	scrollbarHeight: '.5rem',
	scrollbarWidth: '.5rem',
	thumbColor: '#00000020',
	thumbColorActive: '#00000050',
	thumbColorHover: '#00000030',
};

export const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#014E5F',
				light: '#EAF0F2',
			},
			background: {
				default: '#EDEEF0',
				paper: '#FFF',
			},
		},
		shape: {
			borderRadius: 8,
		},
		typography: {
			fontFamily: ['IBM Plex Sans', 'Quicksand', 'sans-serif'].join(','),
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: defaultStyles.concat(
					FontFace.generateFontParameters(fontList),
					generateScrollbarStyles(scrollbarParameters)
				),
			},
			MuiTextField: {
				defaultProps: {
					variant: 'standard',
				},
			},
			MuiButton: {
				defaultProps: {
					disableElevation: true,
					disableRipple: true,
					size: 'small',
				},
				styleOverrides: {
					root: {
						borderRadius: '4px',
					},
				},
			},
			MuiIconButton: {
				defaultProps: {
					size: 'small',
				},
			},
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true,
				},
			},
			MuiButtonGroup: {
				defaultProps: {
					disableRipple: true,
				},
			},
			MuiPaper: {
				defaultProps: {
					variant: 'outlined',
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						border: 'none',
					},
				},
				defaultProps: {
					elevation: 0,
				},
			},
			MuiTooltip: {
				defaultProps: {
					arrow: true,
					enterDelay: 300,
				},
			},
			MuiSvgIcon: {
				defaultProps: {
					fontSize: 'small',
				},
			},
			MuiDrawer: {
				styleOverrides: {
					paper: {
						transition: 'none !important',
						animation: 'none !important',
					},
				},
			},
		},
	},
	ruRU
);
