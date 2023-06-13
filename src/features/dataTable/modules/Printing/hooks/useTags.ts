import { useLocation } from 'react-router-dom';

import columns from 'features/dataTable/columns';
import { selectSelectionModel } from 'features/dataTable/dataTableSlice';
import { useGetSelectedTagsQuery } from 'features/dataTable/modules/Printing/printApiSlice';
import { convertColumnsToObjectView } from 'features/dataTable/modules/Printing/utils/convertColumnsToObjectView';
import { useAppSelector } from 'hooks/redux';


interface ILocationState {
	visibleColumns: string[];
}

export const useTags = () => {
	const selectedIds = useAppSelector(selectSelectionModel);

	const { visibleColumns } = useLocation().state as ILocationState;
	const {
		isFetching,
		data: tags,
		isError,
	} = useGetSelectedTagsQuery({
		selectedIds,
		params: convertColumnsToObjectView(visibleColumns, columns),
	});

	return { isFetching, isError, tags };
};
