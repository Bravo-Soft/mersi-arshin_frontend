import { GridRowParams, GridSelectionModel } from '@mui/x-data-grid-pro';

import {
	selectArshinData,
	selectSelectedDataIds,
	setSelectedDataItems,
	setSelectedDoubleClickIds,
} from '../arshinTableSlice';
import { selectIsStartArshin } from '../eventSourceSlice';

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

	const dataArshin = useAppSelector(selectArshinData);

	const selectionIds = useAppSelector(selectSelectedDataIds);
	const isStart = useAppSelector(selectIsStartArshin);

	const { openSidebarWith } = useSidebarAction('arshin');

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	const handleDoubleClick = (params: GridRowParams<IDataItemArshin>) => {
		dispatch(setSelectedDoubleClickIds(params.row.originId));
		openSidebarWith('EditSidebarArshinItem');
	};

	const handleDisabledSelectedRow = () => !isStart;

	return {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
		handleDoubleClick,
	};
};

export default useTableActions;
