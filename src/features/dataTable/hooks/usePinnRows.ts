import { isValueDefined } from 'guards/isValueDefined';
import { useAppSelector } from 'hooks/redux';
import { selectSelectedDataItem, selectSelectionModel } from '../dataTableSlice';

import type { gridVisibleSortedRowEntriesSelector } from '@mui/x-data-grid-pro';

type VisibilityDataGridRowType = ReturnType<typeof gridVisibleSortedRowEntriesSelector>;

const usePinnRows = (filterState: VisibilityDataGridRowType) => {
	const selectionModel = useAppSelector(selectSelectionModel);
	const selectedDataItem = useAppSelector(selectSelectedDataItem);

	const visibilityModel = filterState.map(({ model }) => model);

	const pinMenuIsActive =
		(selectionModel.length &&
			isValueDefined(selectedDataItem) &&
			!selectionModel.includes(selectedDataItem.id)) ||
		selectionModel.length > 1;

	const lengthArray =
		isValueDefined(selectedDataItem) && selectionModel.includes(selectedDataItem.id)
			? selectionModel.length
			: selectionModel.length + 1;

	const disabledPin = visibilityModel?.length === 1 || lengthArray === visibilityModel?.length;

	return { pinMenuIsActive, disabledPin };
};
export default usePinnRows;
