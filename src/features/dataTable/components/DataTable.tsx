import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';

import columns from '../columns';
import { useGetAllDataQuery } from '../dataTableApiSlice';
import { selectSelectedDataItem, selectSelectionModel } from '../dataTableSlice';
import { useApplySelectedTemplate } from '../hooks/useApplySelectedTemplate';
import useChipFilter from '../hooks/useChipFilter';
import { useContextMenuActions } from '../hooks/useContextMenuActions';
import { useDataTableActions } from '../hooks/useDataTableActions';
import { useRowClasses } from '../hooks/useRowClasses';
import useTableData from '../hooks/useTableData';
import { useUpdateTemplate } from '../hooks/useUpdateTemplate';
import VerificationScheduleModal from '../modules/CreateVerificationSchedule/components/VerificationScheduleModal';
import DataTableBox from '../styled/DataTableBox';
import { columnsVisibility } from '../utils/columnsVisibility';

import { ColumnMenu } from './ColumnMenu';
import { ContextMenu } from './ContextMenu';
import { Footer } from './Footer';
import { NoResultsOverlay } from './NoResultsOverlay';
import { NoRowsOverlay } from './NoRowsOverlay';
import { Toolbar } from './Toolbar';

import { useQuickTourActions } from 'features/quickTour/hooks/useQuickTourActions';
import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { selectUserPermissions } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

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

	/* Хуки, создающие обработчики событий и обрабатывающие загруженные данные */
	const { contextMenu, actionsOfContextMenu } = useContextMenuActions(apiRef, loadedData);
	const { handleDoubleClickOnRow, handleChangeSelectionModel } = useDataTableActions(selectedId);
	const {
		pinnedRows: { top },
		rows,
	} = useTableData(loadedData);
	const filteredRows = useChipFilter(rows);

	/* Прочие хуки */
	const generateClasses = useRowClasses(selectedId);

	/* Установка выбранного шаблона и его обновление */
	useApplySelectedTemplate(apiRef);
	const handleUpdateTemplate = useUpdateTemplate(apiRef);

	const handleColumnsSorting = () => {
		handleUpdateTemplate();
		columnsVisibility(apiRef?.current?.getVisibleColumns(), dispatch);
	};

	//new
	useQuickTourActions(apiRef);

	return (
		<DataTableBox sidebarIsOpen={sidebarIsOpen}>
			<DataGridPro
				apiRef={apiRef}
				columns={columns}
				rows={filteredRows}
				pinnedRows={{ top }}
				loading={isFetchingData}
				pagination
				checkboxSelection
				disableSelectionOnClick
				density='compact'
				onSortModelChange={handleUpdateTemplate}
				onFilterModelChange={handleUpdateTemplate}
				onPageChange={handleUpdateTemplate}
				onPageSizeChange={handleUpdateTemplate}
				onColumnWidthChange={handleUpdateTemplate}
				onPinnedColumnsChange={handleUpdateTemplate}
				onPreferencePanelClose={handleUpdateTemplate}
				onPreferencePanelOpen={handleUpdateTemplate}
				onColumnOrderChange={handleColumnsSorting}
				onColumnVisibilityModelChange={handleColumnsSorting}
				onSelectionModelChange={handleChangeSelectionModel}
				onRowDoubleClick={handleDoubleClickOnRow}
				selectionModel={selectionModel}
				getRowClassName={generateClasses}
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
			<ContextMenu
				contextMenu={contextMenu}
				actionsOfContextMenu={actionsOfContextMenu}
				apiRef={apiRef}
			/>
			<VerificationScheduleModal apiRef={apiRef} />
		</DataTableBox>
	);
}
export default DataTable;
