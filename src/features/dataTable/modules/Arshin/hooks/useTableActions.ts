import { GridCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid-pro';

import {
	selectArshinData,
	selectNotValidArshinClassesItem,
	selectSelectedDataIds,
	setSelectedDataItem,
	setSelectedDataItems,
} from '../arshinTableSlice';

import { ArshinStatus } from 'constant/arshinStatus';
import { selectSidebarStateOfArshinPage } from 'features/sidebar/sidebarSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSidebarAction } from 'hooks/useSidebarActions';
import { IDataItemArshin } from 'types/arshinIntegration';

/**
 * @package хук для обработки выбранных позиций в модели
 * @function handleSelectItems => функция обработки модели
 * @function handleDisabledSelectedRow => функция блокирующая возможность изменения выбранной модели
 * @argument selectionIds => выбранная модель
 * @returns возвращает [selectionIds , handleSelectItems , handleDisabledSelectedRow ]
 */

const useTableActions = () => {
	const dispatch = useAppDispatch();

	const { open } = useAppSelector(selectSidebarStateOfArshinPage);

	const { closeSidebar, openSidebarWith } = useSidebarAction('arshin');

	const dataArshin = useAppSelector(selectArshinData);

	const selectionIds = useAppSelector(selectSelectedDataIds);

	const arshinItems = useAppSelector(selectNotValidArshinClassesItem);

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	const handleDisabledSelectedRow = (params: GridRowParams<IDataItemArshin>) =>
		params.row.status !== ArshinStatus.PROCESS;

	const handleGetCellClassName = (params: GridCellParams<unknown, IDataItemArshin>) => {
		const isNotValid = arshinItems.map(({ id }) => id).includes(params.row.id);
		if (params.field === 'name' && isNotValid) {
			return 'notValid';
		}
		if (params.row.status === ArshinStatus.PROCESS) {
			return 'arshinProcessRow';
		}
		return '';
	};

	const handleDoubleClickOnRow = async ({ row }: GridRowParams<IDataItemArshin>) => {
		if (selectionIds.includes(row.id)) {
			if (open) {
				closeSidebar();
			} else {
				dispatch(setSelectedDataItem(row));
			}
		} else {
			dispatch(setSelectedDataItem(row));
			openSidebarWith('EditArshinItem');
		}
		openSidebarWith('EditArshinItem');
	};

	return {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
		handleGetCellClassName,
		handleDoubleClickOnRow,
	};
};

export default useTableActions;
