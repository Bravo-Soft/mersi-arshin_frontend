import { GridSelectionModel } from '@mui/x-data-grid-pro';

import {
	selectSelectedDataIds,
	selectSelectedDataItems,
	setSelectedDataItems,
} from '../arshinTableSlice';
import { dataArshin } from '../components/DataTableArshin';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

const useTableActions = () => {
	const dispatch = useAppDispatch();

	const selectionIds = useAppSelector(selectSelectedDataIds);
	const selectionItems = useAppSelector(selectSelectedDataItems);

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	return {
		selectionIds,
		selectionItems,
		handleSelectItems,
	};
};

export default useTableActions;
