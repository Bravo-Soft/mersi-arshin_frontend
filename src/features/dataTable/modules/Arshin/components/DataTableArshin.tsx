import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, GridSelectionModel, useGridApiRef } from '@mui/x-data-grid-pro';

import { selectRequest } from '../arshinTableSlice';
import { columnsArshin } from '../config/columns';
import { useApplyTemplate } from '../hooks/useApplyTemplate';
import { useContextMenuActions } from '../hooks/useContextMenuActions';
import { useFilterArshin } from '../hooks/useFilterArshin';
import useTableActions from '../hooks/useTableActions';

import ContextMenuArshin from './ContextMenuArshin';
import DataTableArshinToolbar from './DataTableArshinToolbar';
import ProcessArshin from './Process/ProcessArshin';

import { ColumnMenu } from 'features/dataTable/components/ColumnMenu'; // add column menu from dataTable Components
import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import DataTableBox from 'styled/DataTableBox';

function DataTableArshin() {
	const apiRef = useGridApiRef();

	const { isLoading, data } = useFilterArshin();

	useApplyTemplate(apiRef);

	const {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
		handleGetCellClassName,
		handleDoubleClickOnRow,
	} = useTableActions();

	const { open: sidebarIsOpen, selector } = useAppSelector(selectSidebarStateOfArshinPage);

	const { contextMenu, actions } = useContextMenuActions(data);

	return (
		<DataTableBox sidebarIsOpen={sidebarIsOpen} selector={selector}>
			<DataGridPro
				apiRef={apiRef}
				columns={columnsArshin}
				rows={data}
				loading={isLoading}
				pagination
				checkboxSelection
				disableColumnReorder
				onRowDoubleClick={handleDoubleClickOnRow}
				// disableColumnMenu
				// disableColumnFilter
				// disableSelectionOnClick
				// disableColumnResize
				// disableColumnSelector
				density='compact'
				components={{
					LoadingOverlay: LinearProgress,
					Toolbar: DataTableArshinToolbar,
					ColumnMenu,
					NoRowsOverlay,
					NoResultsOverlay,
				}}
				isRowSelectable={handleDisabledSelectedRow}
				onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
					handleSelectItems(newSelectionModel);
				}}
				selectionModel={selectionIds}
				componentsProps={{
					row: {
						onContextMenu: actions.handleOpenContextMenu,
						style: { cursor: 'pointer' },
					},
				}}
				getCellClassName={handleGetCellClassName}
			/>

			<ContextMenuArshin contextMenu={contextMenu} actions={actions} />
			<ProcessArshin apiRef={apiRef} />
		</DataTableBox>
	);
}

export default DataTableArshin;
