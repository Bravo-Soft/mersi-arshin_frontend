import { GridCellParams, GridRowParams, GridSelectionModel } from "@mui/x-data-grid-pro";

import {
	selectArshinData,
	selectNotValidArshinClassesItem,
	selectSelectedDataIds,
	setSelectedDataItems
} from "../arshinTableSlice";

import { ArshinStatus } from "constant/arshinStatus";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { IDataItemArshin } from "types/arshinIntegration";

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

	return {
		selectionIds,
		handleSelectItems,
		handleDisabledSelectedRow,
		handleGetCellClassName,
	};
};

export default useTableActions;
