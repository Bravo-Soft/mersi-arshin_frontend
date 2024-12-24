import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import {
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import DataTableColumnButton from './DataTableColumnButton';
import ReportsButton from './ReportsButton';
import { scrollbarStyles } from './scrollbarStyles';

import ButtonsNavigation from 'features/dataTable/components/ButtonsNavigation';

function HistoryTableToolbar(): JSX.Element {
	const { itemId } = useParams();

	const densityRef = useRef<HTMLButtonElement | null>(null);

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
					</Stack>
					<Stack
						direction='row'
						gap={4}
						alignItems='center'
						sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
					>
						{itemId && (
							<Button variant='contained' size='large'>
								История СИ
							</Button>
						)}

						<div id='column'>
							<DataTableColumnButton />
						</div>
						{/* 
						<div id='density'>
							<Tooltip title='Настройка высоты строк в таблице'>
								<GridToolbarDensitySelector ref={densityRef} />
							</Tooltip>
						</div> */}

						<div id='filter'>
							<GridToolbarFilterButton />
						</div>

						{/* <DataTableModulesButton />

						 */}

						<ReportsButton />
					</Stack>
				</Toolbar>
			</GridToolbarContainer>
		</>
	);
}

export default HistoryTableToolbar;
