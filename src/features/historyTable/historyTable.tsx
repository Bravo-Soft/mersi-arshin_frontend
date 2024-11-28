import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, DataGridProProps, useGridApiRef } from '@mui/x-data-grid-pro';
import { useCallback } from 'react';

import columns from './columns';
import HistoryCollapse from './components/HistoryCollapse/HistoryCollapse';
import { NoResultsOverlay } from './components/NoResultsOverlay';
import { NoRowsOverlay } from './components/NoRowsOverlay';
import { Toolbar } from './components/Toolbar';
import { useGetAllHistoryDataQuery } from './historyTableApiSlice';

import { selectSidebarStateOfHistoryPage } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import DataTableBox from 'styled/DataTableBox';

function HistoryTable(): JSX.Element {
	const apiRef = useGridApiRef();

	const { open: sidebarIsOpen } = useAppSelector(selectSidebarStateOfHistoryPage);

	/* Загрузка данных */
	const { data = [], isFetching: isFetchingData } = useGetAllHistoryDataQuery(undefined, {
		pollingInterval: 60000,
		refetchOnMountOrArgChange: true,
	});

	//Функции для отрисовки подменю строки

	// const getDetailPanelContent = useCallback<
	// 	NonNullable<DataGridProProps['getDetailPanelContent']>
	// >(({ row }) => <HistoryCollapse row={row} />, []);

	// const getDetailPanelHeight = useCallback(() => 'auto', []);

	return (
		<>
			<DataTableBox sidebarIsOpen={sidebarIsOpen}>
				<DataGridPro
					// getDetailPanelContent={getDetailPanelContent}
					// getDetailPanelHeight={getDetailPanelHeight}
					rowThreshold={0}
					apiRef={apiRef}
					columns={columns}
					rows={data}
					loading={isFetchingData}
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
						DetailPanelCollapseIcon: KeyboardArrowUp,
						DetailPanelExpandIcon: KeyboardArrowDown,
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
