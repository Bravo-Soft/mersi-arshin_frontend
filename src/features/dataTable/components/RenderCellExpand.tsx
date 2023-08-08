import Link from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import { ArshinIcon } from '../modules/Arshin/ArshinIcon';

const stringIsUrl = (value: string) => {
	return z.string().url().safeParse(value).success;
};

const removeLink = (value: string) => {
	return value
		.split(' ')
		.filter(substr => !stringIsUrl(substr))
		.join(' ');
};

const extractLinks = (value: string) => {
	return value.split(' ').filter(substr => stringIsUrl(substr));
};

const isOverflown = (element: Element | null) => {
	if (!element) {
		return false;
	}
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
};

const GridCellExpand = memo((props: GridCellExpandProps) => {
	/* Пропсы */
	const { width, value, links } = props;

	/* Состояние */
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [showFullCell, setShowFullCell] = useState(false);
	const [showPopper, setShowPopper] = useState(false);

	/* Рефы */
	const wrapper = useRef<HTMLDivElement | null>(null);
	const cellDiv = useRef(null);
	const cellValue = useRef(null);

	/* Тема */
	const { palette, zIndex } = useTheme();

	/* Обработчики */
	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent: KeyboardEvent) {
			if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
				setShowFullCell(false);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<Box
			ref={wrapper}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			alignItems='center'
			lineHeight={24}
			width={1}
			height={1}
			position='relative'
			display='flex'
			justifyContent='center'
		>
			<Box ref={cellDiv} height={1} width={width} display='block' position='absolute' top={0} />
			<Box
				ref={cellValue}
				whiteSpace='nowrap'
				overflow='hidden'
				textOverflow='ellipsis'
				display='flex'
				alignItems='center'
			>
				{value}
				<Stack direction='row' spacing={1} ml={1}>
					{links.length
						? links.map((link, index) => (
								<Tooltip title={link} key={link + index}>
									<IconButton component='a' href={link} target='_blank'>
										<Link />
									</IconButton>
								</Tooltip>
						  ))
						: null}
				</Stack>
			</Box>
			{showPopper && (
				<Popper
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					placement='right'
					sx={{ width, zIndex: zIndex.tooltip }}
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={250}>
							<Paper
								variant='outlined'
								sx={{
									width: 'fit-content',
									wordWrap: 'break-word',
									bgcolor: alpha(palette.common.black, 0.6),
									p: 1,
								}}
							>
								<Typography
									variant='body2'
									color={palette.getContrastText(alpha(palette.common.black, 0.5))}
								>
									{value}
								</Typography>
							</Paper>
						</Fade>
					)}
				</Popper>
			)}
		</Box>
	);
});

interface GridCellExpandProps {
	value: string;
	width: number;
	links: string[];
}

export function RenderCellExpand(params: GridRenderCellParams<string>): JSX.Element {
	return (
		<GridCellExpand
			value={params.value ? removeLink(params.value) : '–'}
			width={params.colDef.computedWidth}
			links={params.value ? extractLinks(params.value) : []}
		/>
	);
}

export function RenderCellExpandedRegister(
	params: GridRenderCellParams<boolean>
): JSX.Element | string {
	return params ? <ArshinIcon /> : '-';
}
