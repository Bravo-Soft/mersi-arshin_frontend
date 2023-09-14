import Chip from '@mui/material/Chip';
import { red, yellow } from '@mui/material/colors';
import { darken, styled } from '@mui/material/styles';

import { generateBootstrapShadow } from 'utils/generateBootstapShadow';

const properties: PropertyKey[] = ['isFavoriteChip', 'monthPanelIsActivated', 'isOverdueChip'];

const favoriteChipBackgroundColor = yellow[50];
const favoriteChipContastColor = yellow[700];

const StyledChip = styled(Chip, {
	shouldForwardProp: prop => !properties.includes(prop),
})<IStyledChipProps>(({ theme, monthPanelIsActivated, isFavoriteChip, color, isOverdueChip }) => ({
	textTransform: 'uppercase',
	fontWeight: 500,
	border: `1px solid ${theme.palette.divider}`,
	transition: theme.transitions.create('all'),
	color: color === 'primary' ? theme.palette.common.white : theme.palette.text.secondary,

	':active': {
		boxShadow: 'none',
	},

	...(isFavoriteChip && {
		backgroundColor: favoriteChipBackgroundColor,
		borderColor: favoriteChipContastColor,
		color: favoriteChipContastColor,

		':hover': {
			backgroundColor: darken(favoriteChipBackgroundColor, theme.palette.action.hoverOpacity),
		},

		'& .MuiSvgIcon-root': {
			fill: favoriteChipContastColor,
		},
	}),

	...(isOverdueChip && {
		backgroundColor: red[50],
		border: `1px solid ${red[700]}`,
		color: red[700],

		':hover': {
			backgroundColor: darken(red[50], theme.palette.action.hoverOpacity),
		},
	}),

	...(monthPanelIsActivated && {
		boxShadow: generateBootstrapShadow(theme, 'primary', 0.5),
		borderColor: theme.palette.primary.main,
		'*': {
			color: theme.palette.primary.main,
		},
	}),
}));

interface IStyledChipProps {
	monthPanelIsActivated?: boolean;
	isFavoriteChip?: boolean;
	isOverdueChip?: boolean;
}

export default StyledChip;
