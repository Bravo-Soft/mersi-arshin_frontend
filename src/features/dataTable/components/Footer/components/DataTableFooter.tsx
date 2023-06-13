import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {
	GridFooterContainer,
	GridSelectedRowCount,
	selectedGridRowsCountSelector,
	useGridApiContext,
	useGridSelector,
} from '@mui/x-data-grid-pro';

import StyledGridPagination from '../styled/StyledGridPagination';

import DataTableAddAction from './DataTableAddAction';

import { selectActualStartTour } from 'features/quickTour/components/quickTourSlice';
import { selectUserRoles } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';




function DataTableFooter(): JSX.Element {
	const { isWriter, isAdmin } = useAppSelector(selectUserRoles);
	const startIsMenu = useAppSelector(selectActualStartTour);

	const apiRef = useGridApiContext();
	const selectedRowCount = useGridSelector(apiRef, selectedGridRowsCountSelector);
	const { spacing } = useTheme();

	return (
		<GridFooterContainer>
			<Box flexGrow={1} minWidth={115}>
				{selectedRowCount ? <GridSelectedRowCount selectedRowCount={selectedRowCount} /> : null}
			</Box>
			<StyledGridPagination isWriter={isWriter} isAdmin={isAdmin} />
			{(isWriter || isAdmin || startIsMenu) && (
				<DataTableAddAction
					sx={{ position: 'absolute', right: spacing(3), bottom: spacing(3) }}
				/>
			)}
		</GridFooterContainer>
	);
}

export default DataTableFooter;
