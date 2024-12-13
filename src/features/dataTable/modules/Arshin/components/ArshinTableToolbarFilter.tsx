import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import { useRef } from 'react';

import { selectFilterType, setFilterType } from '../arshinTableSlice';

import StyledChip from 'features/dataTable/styled/StyledChip';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ARSHIN_FILTER_TYPE } from 'types/arshinIntegration';

function ArshinTableToolbarFilter() {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();
	const filterType = useAppSelector(selectFilterType);

	const handleChangeFilter = (type: ARSHIN_FILTER_TYPE) => {
		dispatch(setFilterType(type));
	};

	const chips = [
		{
			label: ARSHIN_FILTER_TYPE.ALL,
			onClick: () => handleChangeFilter(ARSHIN_FILTER_TYPE.ALL),
			color: filterType === ARSHIN_FILTER_TYPE.ALL ? 'primary' : 'default',
		},
		{
			label: ARSHIN_FILTER_TYPE.MY_ITEMS,
			onClick: () => handleChangeFilter(ARSHIN_FILTER_TYPE.MY_ITEMS),
			color: filterType === ARSHIN_FILTER_TYPE.MY_ITEMS ? 'primary' : 'default',
		},
		{
			label: ARSHIN_FILTER_TYPE.MY_COMPLETED,
			onClick: () => handleChangeFilter(ARSHIN_FILTER_TYPE.MY_COMPLETED),
			color: filterType === ARSHIN_FILTER_TYPE.MY_COMPLETED ? 'primary' : 'default',
		},
	];

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
				{chips.map(({ label, onClick, color }) => (
					<StyledChip
						key={label}
						label={label}
						onClick={onClick}
						color={color as 'primary' | 'default'}
					/>
				))}
			</Box>
		</MuiToolbar>
	);
}

export default ArshinTableToolbarFilter;
