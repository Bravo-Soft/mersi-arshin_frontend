import { GridSelectionModel } from '@mui/x-data-grid-pro';

import {
	selectArshinData,
	selectSelectedDataIds,
	selectSelectedDataItems,
	setSelectedDataItems,
} from '../arshinTableSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

const useTableActions = () => {
	const dispatch = useAppDispatch();

	const dataArshin = useAppSelector(selectArshinData);

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
