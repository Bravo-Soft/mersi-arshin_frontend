import { GridCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid-pro';
import { Dayjs } from 'dayjs';

import {
	selectArshinData,
	selectNotValidArshinItem,
	selectSelectedDataIds,
	setSelectedDataItems,
	setSelectedDoubleClickIds,
} from '../arshinTableSlice';
import { selectIsAliveArshin, selectIsStartArshin } from '../eventSourceSlice';

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
	const isAlive = useAppSelector(selectIsAliveArshin);

	const arshinItems = useAppSelector(selectNotValidArshinItem);

	const { openSidebarWith } = useSidebarAction('arshin');

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	const handleDoubleClick = (params: GridRowParams<IDataItemArshin>) => {
		if (!isAlive || isStart) return;
		dispatch(setSelectedDoubleClickIds(params.row.originId));
		openSidebarWith('EditSidebarArshinItem');
	};

	const handleDisabledSelectedRow = () => !isStart && isAlive;

	const handleGetCellClassName = (params: GridCellParams<unknown, IDataItemArshin>) => {
		const isNotValid = arshinItems.map(({ id }) => id).includes(params.row.id);
		if (params.field === 'name' && isNotValid) {
			return 'notValid';
		}
		return '';
	};

	return {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
		handleDoubleClick,
		handleGetCellClassName,
	};
};

export default useTableActions;
