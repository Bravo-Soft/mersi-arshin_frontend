import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useGetAllDataQuery } from '../dataTableApiSlice';
import { selectSelectedDataItem, selectSelectionModel } from '../dataTableSlice';
import { useGetAllFavoriteIdsQuery } from '../favoritesApiSlice';
import { useApplySelectedTemplate } from '../hooks/useApplySelectedTemplate';
import { useContextMenuActions } from '../hooks/useContextMenuActions';
import { useDataTableActions } from '../hooks/useDataTableActions';
import { useRowClasses } from '../hooks/useRowClasses';
import { columnsVisibility } from '../utils/columnsVisibility';
import { ColumnMenu } from './ColumnMenu';
import { ContextMenu } from './ContextMenu';
import { Footer } from './Footer';
import { NoResultsOverlay } from './NoResultsOverlay';
import { NoRowsOverlay } from './NoRowsOverlay';
import { Toolbar } from './Toolbar';

import LinearProgress from '@mui/material/LinearProgress';
import columns from '../columns';
import useChipFilter from '../hooks/useChipFilter';
import useTableData from '../hooks/useTableData';
import VerificationScheduleModal from '../modules/CreateVerificationSchedule/components/VerificationScheduleModal';
import DataTableBox from '../styled/DataTableBox';

function DataTable(): JSX.Element {
	const apiRef = useGridApiRef();

	const dispatch = useAppDispatch();

	/* Селекторы */
	const selectionModel = useAppSelector(selectSelectionModel);
	const selectedId = useAppSelector(selectSelectedDataItem);
	const { open: sidebarIsOpen } = useAppSelector(selectSidebarStateOfHomePage);
	const { multipleColumnsFiltering, columnPinning, columnReorder, rowPinning } =
		useAppSelector(selectUserPermissions);

	/* Загрузка данных */
	const { data: loadedData = [], isFetching: isFetchingData } = useGetAllDataQuery(undefined, {
		pollingInterval: 60000,
	});
	const { data: favoriteIds = [], isLoading: isFetchingFavorites } = useGetAllFavoriteIdsQuery();

	/* Хуки, создающие обработчики событий и обрабатывающие загруженные данные */
	const { contextMenu, actionsOfContextMenu } = useContextMenuActions(apiRef, loadedData);
	const { handleDoubleClickOnRow, handleChangeSelectionModel } = useDataTableActions(selectedId);
	const {
		pinnedRows: { top },
		rows,
	} = useTableData(loadedData);
	const filteredRows = useChipFilter(rows);

	/* Прочие хуки */
	const generateClasses = useRowClasses(selectedId, favoriteIds);
	useApplySelectedTemplate(apiRef);

	const handleColumnsSorting = () =>
		columnsVisibility(apiRef?.current?.getVisibleColumns(), dispatch);

	return (
		<DataTableBox sidebarIsOpen={sidebarIsOpen}>
			<DataGridPro
				apiRef={apiRef}
				columns={columns}
				rows={filteredRows}
				pinnedRows={{ top }}
				loading={isFetchingData}
				disableSelectionOnClick
				pagination
				checkboxSelection
				density='compact'
				onColumnOrderChange={handleColumnsSorting}
				onColumnVisibilityModelChange={handleColumnsSorting}
				selectionModel={selectionModel}
				onSelectionModelChange={handleChangeSelectionModel}
				getRowClassName={generateClasses}
				onRowDoubleClick={handleDoubleClickOnRow}
				disableColumnPinning={!columnPinning}
				disableMultipleColumnsFiltering={!multipleColumnsFiltering}
				disableColumnReorder={!columnReorder}
				experimentalFeatures={{ rowPinning }}
				initialState={{ columns: { columnVisibilityModel: {} } }}
				components={{
					LoadingOverlay: LinearProgress,
					Toolbar,
					Footer,
					ColumnMenu,
					NoRowsOverlay,
					NoResultsOverlay,
				}}
				componentsProps={{
					row: {
						onContextMenu: actionsOfContextMenu.handleOpenContextMenu,
						style: { cursor: isFetchingFavorites ? 'progress' : 'pointer' },
					},
				}}
			/>
			<ContextMenu
				contextMenu={contextMenu}
				actionsOfContextMenu={actionsOfContextMenu}
				disabledPin={filteredRows.length === 1}
			/>
			<VerificationScheduleModal apiRef={apiRef} />
		</DataTableBox>
	);
}
export default DataTable;
