import { alpha, useTheme } from '@mui/material/styles';
import { memo, useEffect, useRef, useState } from 'react';

import type { GridRenderCellParams } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

const isOverflown = (element: Element) => {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
};

const GridCellExpand = memo((props: GridCellExpandProps) => {
	/* Пропсы */
	const { width, value } = props;

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
		const isCurrentlyOverflown = isOverflown(cellValue.current!);
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
			<Box ref={cellValue} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
				{value}
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
}

export function RenderCellExpand(params: GridRenderCellParams<string>) {
	return <GridCellExpand value={params.value || '–'} width={params.colDef.computedWidth} />;
}
