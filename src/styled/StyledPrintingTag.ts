import Paper from '@mui/material/Paper';
import { styled, lighten } from '@mui/material/styles';
import {
	/* isFirefox */ isChromium,
	isYandex,
	isChrome,
	isEdge,
	isFirefox,
} from 'react-device-detect';

import type { TagSizesType } from 'features/dataTable/modules/Printing/utils/sizesConvert';


const properties: PropertyKey[] = ['sizes'];

const isChromeFamily = isChromium || isYandex || isChrome || isEdge;

const StyledPrintingTag = styled(Paper, {
	shouldForwardProp: prop => !properties.includes(prop),
})<IStyledChipProps>(({ theme, sizes }) => ({
	resize: 'both',
	gap: '0px 10px',
	display: 'flex',
	flexWrap: 'wrap',
	overflow: 'auto',
	width: sizes.width,
	height: sizes.height,
	flexDirection: 'column',
	padding: theme.spacing(1),
	backgroundColor: theme.palette.background.default,
	transition: theme.transitions.create(['border-color', 'box-shadow'], {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.sharp,
	}),
	'& .MuiTypography-root': {
		fontSize: `${sizes.font}px`,
	},
	':hover': {
		cursor: 'pointer',
		backgroundColor: theme.palette.primary.light,
		borderColor: lighten(theme.palette.primary.main, 0.5),
		boxShadow: `0px 0px 1.5px 1.5px ${lighten(theme.palette.primary.main, 0.7)}`,
	},
	...(isChromeFamily && {
		'@media print': {
			boxSizing: 'border-box',
			resize: 'none',
			overflow: 'hidden',
			boxShadow: 'initial',
			display: 'flex',
			float: 'left',
			breakAfter: 'avoid',
			breakBefore: 'avoid',
			breakInside: 'avoid',
			backgroundColor: 'inherit',
			maxHeight: '100vh',
			border: `1px solid ${theme.palette.common.black}`,
		},
	}),
	...(isFirefox && {
		'@media print': {
			boxSizing: 'border-box',
			resize: 'none',
			overflow: 'hidden',
			boxShadow: 'initial',
			float: 'left',
			backgroundColor: 'inherit',
			breakAfter: 'avoid',
			breakBefore: 'avoid',
			breakInside: 'avoid',
			// maxHeight: '100vh',
			border: `1px solid ${theme.palette.common.black}`,
		},
	}),
}));

export default StyledPrintingTag;

interface IStyledChipProps {
	sizes: TagSizesType;
}
