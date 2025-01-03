import ExpandIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import {
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { useEffect, useRef, useState } from 'react';

import ButtonsNavigation from '../../ButtonsNavigation';

import DataTableColumnButton from './DataTableColumnButton';
import DataTableToolbarFilter from './DataTableToolbarFilter';
import { scrollbarStyles } from './scrollbarStyles';

import DataTableModulesButton from 'features/dataTable/modules/DataTableModulesButton';
import DataTableReportsButton from 'features/dataTable/modules/DataTableReportsButton';
import { selectActualStep, selectMenuStart } from 'features/quickTour/components/quickTourSlice';
import { useAppSelector } from 'hooks/redux';

function DataTableToolbar(): JSX.Element {
	const [expanded, setExpanded] = useState(false);

	const actualStep = useAppSelector(selectActualStep);
	const startIsMenu = useAppSelector(selectMenuStart);

	const handleToggleFilterPanel = () => {
		setExpanded(prev => !prev);
	};

	const densityRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		//если 7 шаг и запущенно из меню ( чтобы успел отработать анимация открытия )
		if (actualStep === 7 && densityRef.current && startIsMenu) {
			densityRef.current.click();
		} else if (actualStep === 3 && startIsMenu) {
			//трекер открытия toolbar
			setExpanded(true);
		} else {
			setExpanded(false);
		}
	}, [actualStep, startIsMenu]);

	return (
		<>
			<GridToolbarContainer sx={scrollbarStyles}>
				<Toolbar sx={{ width: 1 }}>
					<Stack
						direction='row'
						alignItems='center'
						flexGrow={1}
						spacing={2}
						divider={<Divider orientation='vertical' flexItem />}
					>
						<ButtonsNavigation />

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
					</Stack>
					<Stack
						direction='row'
						gap={4}
						alignItems='center'
						sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
					>
						<div id='column'>
							<DataTableColumnButton />
						</div>

						<div id='filter'>
							<GridToolbarFilterButton />
						</div>

						<DataTableReportsButton />
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
