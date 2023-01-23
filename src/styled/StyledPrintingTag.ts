import { styled, lighten } from '@mui/material/styles';

import type { TagSizesType } from 'features/dataTable/modules/Printing/utils/sizesConvert';

import Paper from '@mui/material/Paper';

const properties: PropertyKey[] = ['sizes'];

const StyledPrintingTag = styled(Paper, {
	shouldForwardProp: prop => !properties.includes(prop),
})<IStyledChipProps>(({ theme, sizes }) => ({
	resize: 'both',
	gap: '5px 15px',
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
	'@media print': {
		height: 'auto',
		resize: 'none',
		overflow: 'hidden',
		boxShadow: 'initial',
		display: 'inline-flex',
		margin: theme.spacing(1),
		pageBreakAfter: 'auto',
		pageBreakBefore: 'auto',
		pageBreakInside: 'always',
		backgroundColor: 'inherit',
		maxHeight: 'calc(100vh - 20px) ',
		border: `2px solid ${theme.palette.common.black}`,
	},
}));

export default StyledPrintingTag;

interface IStyledChipProps {
	sizes: TagSizesType;
}
