import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { useRef } from 'react';

import { useFilterArshin } from '../hooks/useFilterArshin';

import StyledChip from 'features/dataTable/styled/StyledChip';

function ArshinTableToolbarFilter() {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	const [updateArshinFilter, completeDone] = useFilterArshin();

	const handleCompleting = () => {
		updateArshinFilter();
	};

	return (
		<MuiToolbar sx={{ overflowX: 'hidden', width: '100%' }} ref={viewportRef}>
			<Box
				ref={containerRef}
				id='toolbar'
				sx={{
					display: 'flex',
					position: 'relative',
					gap: 3,
					py: 1,
					width: 'inherit',
					alignItems: 'center',
				}}
			>
				<StyledChip
					label='Все средства измерения'
					variant='filled'
					onClick={handleCompleting}
					// color={completeDone ? 'default' : 'primary'}
				/>
				<StyledChip
					label='Мои средства измерения'
					variant='filled'
					onClick={handleCompleting}
					color={completeDone ? 'default' : 'primary'}
				/>

				<StyledChip
					label='Готовые'
					variant='filled'
					onClick={handleCompleting}
					color={completeDone ? 'primary' : 'default'}
				/>
			</Box>
		</MuiToolbar>
	);
}

export default ArshinTableToolbarFilter;
