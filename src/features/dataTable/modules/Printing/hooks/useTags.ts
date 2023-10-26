import { useLocation } from 'react-router-dom';

import columns from 'features/dataTable/columns';
import { selectSelectionModel } from 'features/dataTable/dataTableSlice';
import { useGetSelectedTagsQuery } from 'features/dataTable/modules/Printing/printApiSlice';
import { convertColumnsToObjectView } from 'features/dataTable/modules/Printing/utils/convertColumnsToObjectView';
import { useAppSelector } from 'hooks/redux';

export const useTags = () => {
	const selectedIds = useAppSelector(selectSelectionModel);

	const { state } = useLocation();
	const {
		isFetching,
		data: tags,
		isError,
	} = useGetSelectedTagsQuery(
		{
			selectedIds,
			params: convertColumnsToObjectView(state?.visibleColumns ?? [], columns),
		},
		{
			skip: !selectedIds && Boolean(state?.visibleColumns.length),
		}
	);

	return { isFetching, isError, tags };
};
