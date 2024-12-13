import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';

import columns from './columns';
import { NoResultsOverlay } from './components/NoResultsOverlay';
import { NoRowsOverlay } from './components/NoRowsOverlay';
import { Toolbar } from './components/Toolbar';
import { useGetHistoryData } from './hooks/useGetHistoryData';

import { selectSidebarStateOfHistoryPage } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import DataTableBox from 'styled/DataTableBox';

function HistoryTable(): JSX.Element {
	const apiRef = useGridApiRef();

	const { open: sidebarIsOpen } = useAppSelector(selectSidebarStateOfHistoryPage);

	/* Загрузка данных в зависимости от наличия/отсутствия id */
	const { data, isFetching } = useGetHistoryData();

	return (
		<>
			<DataTableBox sidebarIsOpen={sidebarIsOpen}>
				<DataGridPro
					rowThreshold={0}
					apiRef={apiRef}
					columns={columns}
					rows={data}
					loading={isFetching}
					pagination
					checkboxSelection
					disableSelectionOnClick
					density='compact'
					initialState={{
						columns: { columnVisibilityModel: {} },
						sorting: {
							sortModel: [{ field: 'action', sort: 'asc' }],
						},
					}}
					components={{
						LoadingOverlay: LinearProgress,
						Toolbar,
						NoResultsOverlay,
						NoRowsOverlay,
					}}
					componentsProps={{
						filterPanel: {
							id: 'filter-panel',
						},
						columnsPanel: {
							id: 'column-panel',
						},
					}}
				/>
			</DataTableBox>
		</>
	);
}
export default HistoryTable;
