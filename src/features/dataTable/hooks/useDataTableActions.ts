import { selectSidebarStateOfHomePage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { applyNewSelectionModel, setSelectedDataItem } from '../dataTableSlice';

import type { GridRowParams, GridSelectionModel } from '@mui/x-data-grid-pro';
import type { IDataItem } from 'types/dataItem';

export const useDataTableActions = (selectedDataItem: IDataItem | null) => {
	const dispatch = useAppDispatch();
	const { selector, open } = useAppSelector(selectSidebarStateOfHomePage);

	const { closeSidebar, openSidebarWith } = useSidebarAction('home');

	const handleChangeSelectionModel = (selectionModel: GridSelectionModel): void => {
		dispatch(applyNewSelectionModel(selectionModel));
	};

	const handleDoubleClickOnRow = async ({ row }: GridRowParams<IDataItem>) => {
		if (row.id === selectedDataItem?.id) {
			if (open) {
				closeSidebar();
			} else {
				openSidebarWith('EditDataItem');
			}
		} else {
			dispatch(setSelectedDataItem(row));
			switch (selector) {
				case 'EditDataItem':
					return openSidebarWith('EditDataItem');

				case 'VerificateDataItem':
					return openSidebarWith('VerificateDataItem');

				case 'FilesDataItem':
					return openSidebarWith('FilesDataItem');

				default:
					return openSidebarWith('EditDataItem');
			}
		}
	};

	return { handleDoubleClickOnRow, handleChangeSelectionModel };
};
