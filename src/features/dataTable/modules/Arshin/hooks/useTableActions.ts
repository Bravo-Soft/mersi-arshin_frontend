import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { selectArshinData, selectSelectedDataIds, setSelectedDataItems } from '../arshinTableSlice';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

const useTableActions = () => {
	const dispatch = useAppDispatch();

	const dataArshin = useAppSelector(selectArshinData);

	const selectionIds = useAppSelector(selectSelectedDataIds);

	const handleSelectItems = (newSelectionModel: GridSelectionModel) => {
		const selectedItems = dataArshin.filter(el => newSelectionModel.includes(el.id));
		dispatch(setSelectedDataItems(selectedItems));
	};

	return {
		selectionIds,
		handleSelectItems,
	};
};

export default useTableActions;
