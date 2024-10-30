import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, GridCellParams, useGridApiRef } from '@mui/x-data-grid-pro';

import columns from './columns';
import { NoResultsOverlay } from './components/NoResultsOverlay';
import { NoRowsOverlay } from './components/NoRowsOverlay';
import { Toolbar } from './components/Toolbar';
import { useGetAllHistoryDataQuery } from './historyTableApiSlice';

import { selectSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import DataTableBox from 'styled/DataTableBox';

function HistoryTable(): JSX.Element {
	const apiRef = useGridApiRef();

	const dispatch = useAppDispatch();
	const { open: sidebarIsOpen } = useAppSelector(selectSidebarStateOfHomePage);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);
	// const { multipleColumnsFiltering, columnPinning, columnReorder, rowPinning } =
	// 	useAppSelector(selectUserPermissions);

	/* Загрузка данных */
	const { data = [], isFetching: isFetchingData } = useGetAllHistoryDataQuery(
		selectedDataItem?.factoryNumber || undefined,
		{
			pollingInterval: 60000,
			refetchOnMountOrArgChange: true,
		}
	);

	return (
		<DataTableBox sidebarIsOpen={sidebarIsOpen}>
			<DataGridPro
				apiRef={apiRef}
				columns={columns}
				rows={data}
				loading={isFetchingData}
				pagination
				checkboxSelection
				disableSelectionOnClick
				density='compact'
				initialState={{ columns: { columnVisibilityModel: {} } }}
				components={{
					LoadingOverlay: LinearProgress,
					Toolbar,
					NoResultsOverlay,
					NoRowsOverlay,
				}}
				componentsProps={{
					row: {
						style: { cursor: 'pointer' },
					},
					filterPanel: {
						id: 'filter-panel',
					},
					columnsPanel: {
						id: 'column-panel',
					},
				}}
			/>
		</DataTableBox>
	);
}
export default HistoryTable;
