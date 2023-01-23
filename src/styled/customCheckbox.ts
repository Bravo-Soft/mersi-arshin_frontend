import { checkboxClasses } from '@mui/material';

import type { Theme } from '@mui/material/styles';

export function customCheckbox(theme: Theme, color: string) {
	return {
		[`& .${checkboxClasses.root} svg`]: {
			width: 16,
			height: 16,
			backgroundColor: 'transparent',
			border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
			borderRadius: '2px',
		},
		[`& .${checkboxClasses.root} svg path`]: {
			display: 'none',
		},
		[`& .${checkboxClasses.root}.${checkboxClasses.checked}:not(.${checkboxClasses.indeterminate}) svg`]:
			{
				backgroundColor: `${color} !important`,
				borderColor: `${color} !important`,
			},
		[`& .${checkboxClasses.root}.${checkboxClasses.checked} .MuiIconButton-label:after`]: {
			position: 'absolute',
			display: 'table',
			border: '2px solid #fff',
			borderTop: 0,
			borderLeft: 0,
			transform: 'rotate(45deg) translate(-50%,-50%)',
			opacity: 1,
			transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
			content: '""',
			top: '50%',
			left: '39%',
			width: 5.71428571,
			height: 9.14285714,
		},
		[`& .${checkboxClasses.root} .${checkboxClasses.indeterminate} .MuiIconButton-label:after`]: {
			width: 8,
			height: 8,
			backgroundColor: color,
			transform: 'none',
			top: '39%',
			border: 0,
		},
	};
}
