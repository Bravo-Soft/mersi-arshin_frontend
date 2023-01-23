import { useGetAllDataQuery } from 'features/dataTable/dataTableApiSlice';
import { setSelectedDataItem } from 'features/dataTable/dataTableSlice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from './redux';

import type { IDataItem } from 'types/dataItem';

export const useUpdateSelectedDataItem = (selectedDataItem: IDataItem | null) => {
	const dispatch = useAppDispatch();
	const { data } = useGetAllDataQuery();

	const findedData = useMemo(
		() => data?.find(item => item.id === selectedDataItem?.id),
		[data, selectedDataItem?.id]
	);

	useEffect(() => {
		if (findedData) dispatch(setSelectedDataItem(findedData));
	}, [findedData, dispatch]);
};
