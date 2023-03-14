import { useRef } from 'react';
import { scrollbarStyles } from '../DataTableToolbar';

import Box from '@mui/material/Box';
import ChipFilter from './ChipFilter';
import MuiToolbar from '@mui/material/Toolbar';
import ScrollButtonGroup from './ScrollButtonGroup';
import StyledGridToolbarQuickFilter from 'features/dataTable/styled/StyledQuickFilter';
import useScrollButtonGroupProps from 'features/dataTable/hooks/useScrollButtonGroupProps';

function DataTableToolbarFilter() {
	const allButtonRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);

	const scrollStep = containerRef?.current?.offsetWidth && containerRef.current.offsetWidth / 5;

	const scrollProps = useScrollButtonGroupProps({
		refs: {
			viewportRef,
			containerRef,
			allButtonRef,
			searchRef,
		},
		scrollStep,
	});

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
					justifyContent: 'space-between',
					...scrollbarStyles,
				}}
			>
				<ChipFilter ref={allButtonRef} />
				<StyledGridToolbarQuickFilter
					variant='outlined'
					size='small'
					debounceMs={1000}
					inputRef={searchRef}
				/>
			</Box>
			{scrollProps.fullViewport && <ScrollButtonGroup {...scrollProps} />}
		</MuiToolbar>
	);
}

export default DataTableToolbarFilter;
