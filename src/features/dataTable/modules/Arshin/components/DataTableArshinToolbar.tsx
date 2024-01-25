import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { GridToolbarContainer } from '@mui/x-data-grid-pro';

import { useFilterArshin } from '../hooks/useFilterArshin';

import ArshinSendingBtn from './ArshinSendingBtn';
import MenuActionsArshin from './MenuActionsArshin';

import ButtonsNavigation from 'features/dataTable/components/ButtonsNavigation';
import StyledChip from 'features/dataTable/styled/StyledChip';

function DataTableArshinToolbar(): JSX.Element {
	const [updateArshinFilter, completeDone] = useFilterArshin();

	const handleCompleting = () => {
		updateArshinFilter();
	};
	return (
		<>
			<GridToolbarContainer>
				<Toolbar sx={{ width: 1 }}>
					<Stack
						direction='row'
						alignItems='center'
						flexGrow={1}
						spacing={2}
						divider={<Divider orientation='vertical' flexItem />}
					>
						<ButtonsNavigation />

						<StyledChip
							label='Готовые'
							variant='filled'
							onClick={handleCompleting}
							color={completeDone ? 'primary' : 'default'}
						/>
					</Stack>
					<Stack direction='row' gap={4}>
						<ArshinSendingBtn />
						<MenuActionsArshin />
					</Stack>
				</Toolbar>
			</GridToolbarContainer>
		</>
	);
}

export default DataTableArshinToolbar;
