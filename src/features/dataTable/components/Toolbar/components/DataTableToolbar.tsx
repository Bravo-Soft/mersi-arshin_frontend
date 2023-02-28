import {
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { useState } from 'react';
import { hideScrollbar } from 'utils/hideScrollbar';

import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DataTableModulesButton from 'features/dataTable/modules/DataTableModulesButton';
import DataTableColumnButton from './DataTableColumnButton';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import DataTableToolbarFilter from './DataTableToolbarFilter';

export const scrollbarStyles: SxProps<Theme> = {
	overflowX: 'scroll',
	scrollbarWidth: 'none',
	...hideScrollbar(),
};

function DataTableToolbar(): JSX.Element {
	const [expanded, setExpanded] = useState(false);

	const handleToggleFilterPanel = () => {
		setExpanded(prev => !prev);
	};

	return (
		<>
			<GridToolbarContainer sx={scrollbarStyles}>
				<Toolbar sx={{ width: 1 }}>
					<Box display='flex' flexDirection='row' columnGap={2} flexGrow={1} minWidth={350}>
						<Typography
							color='primary.main'
							variant='h6'
							lineHeight={1.3}
							textOverflow='ellipsis'
							noWrap
						>
							Средства измерения
						</Typography>
						<Tooltip
							title={
								expanded
									? 'Скрыть панель быстрых фильтров'
									: 'Показать панель быстрых фильтров'
							}
						>
							<IconButton onClick={handleToggleFilterPanel} color='primary'>
								<ExpandIcon
									sx={{
										transition: theme => theme.transitions.create('rotate'),
										rotate: expanded ? '180deg' : '0deg',
									}}
								/>
							</IconButton>
						</Tooltip>
					</Box>
					<Stack direction='row' gap={4}>
						<DataTableColumnButton />
						<Tooltip title='Настройка высоты строк в таблице'>
							<GridToolbarDensitySelector />
						</Tooltip>
						<div id='filter'>
							<GridToolbarFilterButton />
						</div>

						<DataTableModulesButton />
					</Stack>
				</Toolbar>

				<Collapse in={expanded} sx={{ width: 1, position: 'relative' }}>
					<DataTableToolbarFilter />
				</Collapse>
			</GridToolbarContainer>
		</>
	);
}

export default DataTableToolbar;
