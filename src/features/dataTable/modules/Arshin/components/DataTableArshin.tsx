import LinearProgress from '@mui/material/LinearProgress';
import { DataGridPro, GridSelectionModel, useGridApiRef } from '@mui/x-data-grid-pro';

import { useGetDataQuery } from '../arshinTableApiSlice';
import { columnsArshin } from '../config/columns';
import { useApplyTemplate } from '../hooks/useApplyTemplate';
import { useContextMenuActions } from '../hooks/useContextMenuActions';
import useTableActions from '../hooks/useTableActions';

import ContextMenuArshin from './ContextMenuArshin';
import DataTableArshinToolbar from './DataTableArshinToolbar';

import { NoResultsOverlay } from 'features/dataTable/components/NoResultsOverlay';
import { NoRowsOverlay } from 'features/dataTable/components/NoRowsOverlay';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppSelector } from 'hooks/redux';
import DataTableBox from 'styled/DataTableBox';
import { IDataItemArshin } from 'types/arshinIntegration';

const emptyData: IDataItemArshin[] = [];

function DataTableArshin() {
	const apiRef = useGridApiRef();

	useApplyTemplate(apiRef);
	// const isStart = useAppSelector(selectIsStartArshin);

	const { data, isFetching } = useGetDataQuery(undefined, {
		selectFromResult: ({ data, isFetching }) => ({
			data: data ?? emptyData,
			isFetching,
		}),

		pollingInterval: 15000,
	});

	const { selectionIds, handleSelectItems, handleDisabledSelectedRow } = useTableActions();
	const { open: sidebarIsOpen } = useAppSelector(selectSidebarStateOfArshinPage);

	const { contextMenu, actions } = useContextMenuActions(data);

	return (
		<DataTableBox sidebarIsOpen={sidebarIsOpen}>
			<DataGridPro
				apiRef={apiRef}
				columns={columnsArshin}
				rows={data}
				loading={isFetching}
				disableColumnMenu
				pagination
				checkboxSelection
				disableColumnFilter
				disableSelectionOnClick
				disableColumnResize
				disableColumnReorder
				density='compact'
				components={{
					LoadingOverlay: LinearProgress,
					Toolbar: DataTableArshinToolbar,
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
			/>
			<ContextMenuArshin contextMenu={contextMenu} actions={actions} />
		</DataTableBox>
	);
}

export default DataTableArshin;
