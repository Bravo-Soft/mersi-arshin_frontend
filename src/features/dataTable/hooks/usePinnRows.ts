import { useAppSelector } from 'hooks/redux';
import { isValueDefined } from 'guards/isValueDefined';
import { selectSelectedDataItem, selectSelectionModel } from '../dataTableSlice';

import type { GridValidRowModel } from '@mui/x-data-grid-pro';

const usePinnRows = (filterState: GridValidRowModel[]) => {
	const selectionModel = useAppSelector(selectSelectionModel);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);

	const sortedFilter = filterState.map(({ _, model }) => model);

	const pinMenuIsActive =
		(selectionModel.length &&
			isValueDefined(selectedDataItem) &&
			!selectionModel.includes(selectedDataItem.id)) ||
		selectionModel.length > 1;

	const lengthArray =
		isValueDefined(selectedDataItem) && selectionModel.includes(selectedDataItem.id)
			? selectionModel.length
			: selectionModel.length + 1;

	const disabledPin = sortedFilter?.length === 1 || lengthArray === sortedFilter?.length;

	return { pinMenuIsActive, disabledPin };
};
export default usePinnRows;
