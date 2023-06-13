import type { GridRowParams, GridSelectionModel } from '@mui/x-data-grid-pro';

import { applyNewSelectionModel, setSelectedDataItem } from '../dataTableSlice';

import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import type { IDataItem } from 'types/dataItem';

export const useDataTableActions = (selectedDataItem: IDataItem | null) => {
	const dispatch = useAppDispatch();
	const { open } = useAppSelector(selectSidebarStateOfHomePage);

	const { closeSidebar, openSidebarWith } = useSidebarAction('home');

	const handleChangeSelectionModel = (selectionModel: GridSelectionModel): void => {
		dispatch(applyNewSelectionModel(selectionModel));
	};

	const handleDoubleClickOnRow = async ({ row }: GridRowParams<IDataItem>) => {
		if (row.id === selectedDataItem?.id) {
			if (open) {
				closeSidebar();
			} else {
				dispatch(setSelectedDataItem(row));
			}
		} else {
			dispatch(setSelectedDataItem(row));
			openSidebarWith('EditDataItem');
		}
	};

	return { handleDoubleClickOnRow, handleChangeSelectionModel };
};
