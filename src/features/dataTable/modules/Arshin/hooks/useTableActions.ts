import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { selectArshinData, selectSelectedDataIds, setSelectedDataItems } from '../arshinTableSlice';
import { selectIsStartArshin } from '../eventSourceSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

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

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	const handleDisabledSelectedRow = () => !isStart;

	return {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
	};
};

export default useTableActions;
