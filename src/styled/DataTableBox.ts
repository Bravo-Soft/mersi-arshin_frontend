import Box from '@mui/material/Box';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { checkboxClasses } from '@mui/material/Checkbox';
import { orange, red, yellow } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid-pro';

import { sidebarWidth } from 'constant/sidebarWidth';
import { customCheckbox } from 'styled/customCheckbox';

interface IDataTableBoxProps {
	sidebarIsOpen?: boolean;
}

const DataTableBox = styled(Box, {
	shouldForwardProp: prop => prop !== 'sidebarIsOpen',
})<IDataTableBoxProps>(({ theme, sidebarIsOpen }) => ({
	height: '100%',
	padding: `0 ${theme.spacing(3)}`,
	transition: `${theme.transitions.create('all', {
		easing: theme.transitions.easing.sharp,
	})} !important`,
	marginRight: 0,

	...(sidebarIsOpen && {
		marginRight: sidebarWidth,
	}),

	[`& .${gridClasses.root}`]: {
		width: '100%',
		border: `1px solid ${theme.palette.divider}`,
		backgroundColor: theme.palette.background.paper,
		userSelect: 'none',

		'& *:focus, *:focus-within': {
			outline: 'none',
		},

		/* Стилизация колонок */
		[`& .${gridClasses.pinnedColumns}`]: {
			backgroundColor: theme.palette.primary.light,
			boxShadow: 'none',
		},

		[`& .${gridClasses['pinnedColumns--left']}`]: {
			borderRight: `1px solid ${theme.palette.grey[300]}`,
		},

		[`& .${gridClasses['pinnedColumnHeaders--right']}`]: {
			borderLeft: `1px solid ${theme.palette.grey[300]}`,
		},

		[`& .${gridClasses.pinnedColumnHeaders}`]: {
			backgroundColor: theme.palette.primary.light,
			boxShadow: 'none',
		},

		[`& .${gridClasses['pinnedColumnHeaders--left']}`]: {
			borderRight: `1px solid ${theme.palette.grey[300]}`,
		},

		[`& .${gridClasses['pinnedColumnHeaders--right']}`]: {
			borderLeft: `1px solid ${theme.palette.grey[300]}`,
		},

		[`& .${gridClasses.columnHeaders}`]: {
			borderBottom: `1px solid ${theme.palette.primary.main}`,
			borderRadius: 0,
		},

		[`& .${gridClasses.columnHeaderTitleContainer}`]: {
			justifyContent: 'center',
		},

		[`& .${gridClasses.columnHeader}, .${gridClasses.cell}`]: {
			borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
		},

		[`& .${gridClasses.columnHeader}`]: {
			background: `linear-gradient(180deg, transparent 40%, ${theme.palette.primary.light} 100%)`,
		},

		[`& .${gridClasses.columnSeparator}`]: {
			color: 'transparent',
		},

		/* Перенастройка чекбоксов */
		...customCheckbox(theme, theme.palette.primary.main),

		/* Стилизация строк */
		[`& .${gridClasses.pinnedRows}`]: {
			boxShadow: 'none',
		},

		'& .selectedRow': {
			backgroundColor: `${alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity + 0.15
			)} !important`,

			[`& .${checkboxClasses.root} svg`]: {
				border: `1px solid ${theme.palette.text.primary}`,
			},
		},

		/* Избранные строки */
		'& .favoriteRow': {
			backgroundColor: `${alpha(yellow['A700'], 0.2)}`,
			':hover': {
				backgroundColor: `${alpha(yellow['A700'], 0.3)}`,
			},

			[`& .${buttonBaseClasses.root}`]: {
				':hover': {
					backgroundColor: `${alpha(yellow['A700'], 0.15)}`,
				},
			},

			[`& .${checkboxClasses.checked}`]: {
				color: yellow[700],
			},

			'&.Mui-selected': {
				backgroundColor: `${alpha(yellow['A700'], 0.35)}`,
				':hover': {
					backgroundColor: `${alpha(yellow['A700'], 0.4)}`,
				},
			},

			...customCheckbox(theme, yellow[600]),
		},

		'& .favoriteRowSelected': {
			backgroundColor: `${alpha(yellow['A700'], 0.53)} !important`,

			...customCheckbox(theme, yellow[700]),
		},

		/* Стилизация ячеек (просроченные, 2 недели до поверки) */
		[`& .${gridClasses.cell}`]: {
			lineHeight: '2 !important',
			display: 'flex',
			alignItems: 'center',
			whiteSpace: 'normal',
			justifyContent: 'center',
			':focus': {
				outline: 'none',
			},
		},

		'& .overdueItem': {
			backgroundColor: red[50],
			color: red[700],
		},

		'& .twoWeeksToGo': {
			backgroundColor: orange[100],
		},
	},
}));

export default DataTableBox;
