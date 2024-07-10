import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import checkboxClasses from '@mui/material/Checkbox/checkboxClasses';
import { grey, yellow } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid-pro';

interface IDataGridProps extends BoxProps {
	sidebarNear: boolean;
}

const RootDataGrid = styled(Box, {
	shouldForwardProp: prop => prop !== 'sidebarNear',
})<IDataGridProps>(({ theme: { palette, transitions }, sidebarNear }) => ({
	width: '100%',
	height: '100%',
	[`& .${gridClasses.root}`]: {
		userSelect: 'none',
		border: 'none',

		'& *:focus, *:focus-within': {
			outline: 'none',
		},

		[`& .${gridClasses.main}`]: {
			transition: `${transitions.create('all', {
				easing: transitions.easing.easeInOut,
			})} !important`,
			marginRight: 0,
			backgroundColor: palette.background.paper,

			...(sidebarNear && {
				marginRight: '354px',
			}),
		},

		[`& .${gridClasses.footerContainer}`]: {
			color: 'white',
			borderTop: 'none',
		},

		'& .selectedRow': {
			backgroundColor: `${palette.primary.light}`,
			boxShadow: `4px 0px 0px 0px ${palette.primary.light} inset`,
		},

		[`& .${gridClasses.pinnedColumns}`]: {
			backgroundColor: palette.background.paper,
		},

		[`& .${gridClasses.pinnedColumnHeaders}`]: {
			backgroundColor: palette.primary.main,
			boxShadow: 'none',
		},

		[`& .${gridClasses.columnSeparator}`]: {
			color: palette.primary.main,
		},

		[`& .${gridClasses.columnHeaderTitle}`]: {
			textTransform: 'uppercase',
			whiteSpace: 'pre-wrap',
			fontWeight: 700,
			lineHeight: '16.26px',
		},

		[`& .${gridClasses.columnHeaderTitleContainer}`]: {
			justifyContent: 'center',
		},

		[`& .${gridClasses.cell}`]: {
			lineHeight: '2 !important',
			display: 'flex',
			padding: '5px',
			alignItems: 'center',
			justifyContent: 'center',
			fontFamily: 'Trebuchet MS',
			borderBottom: `1px solid ${palette.primary.main}`,
			borderLeft: `1px solid ${palette.primary.main}`,
			outline: 'none',
			':focus': {
				outline: 'none',
			},
			':first-of-type': {
				borderLeft: 'none',
			},
		},

		[`& .${gridClasses.row}`]: {
			'&.Mui-selected': {
				backgroundColor: `${alpha('#014E5F80', 0.2)}`,

				':hover': {
					backgroundColor: `#014E5F80`,
				},
			},
			':hover': {
				cursor: 'pointer',
				backgroundColor: palette.secondary.light,
			},
		},

		'& .MuiCheckbox-root': {
			color: palette.secondary.dark,
			'&.Mui-checked': {
				color: palette.secondary.main,
			},
		},

		'& .MuiButton-root': {
			':hover': {
				color: 'white',
			},
		},

		'& .overdue': {
			backgroundColor: '#DC204DE5',
		},

		'& .averagePeriod': {
			backgroundColor: '#EAFF66E5',
		},

		'& .favoriteRow': {
			backgroundColor: `${alpha(yellow['A700'], 0.3)}`,
			':hover': {
				backgroundColor: `${alpha(yellow['A700'], 0.53)}`,
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
		},

		'& .favoriteRowSelected': {
			backgroundColor: `${alpha(yellow['A700'], 0.53)}`,
			':hover': {
				backgroundColor: `${alpha(yellow['A700'], 0.4)}`,
			},
		},
		'& .editedRow': {
			color: `${alpha(grey['A700'], 0.53)}`,
			':hover': {
				backgroundColor: 'inherit',
				cursor: 'not-allowed',
			},
		},
	},
}));

export default RootDataGrid;
