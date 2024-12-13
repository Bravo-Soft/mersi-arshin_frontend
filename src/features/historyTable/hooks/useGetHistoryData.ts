import { useParams } from 'react-router-dom';

import { useGetAllHistoryDataQuery, useGetHistoryDataByIdQuery } from '../historyTableApiSlice';

export const useGetHistoryData = () => {
	const { itemId } = useParams();

	const { data: allData = [], isFetching: isFetchingAllData } = useGetAllHistoryDataQuery(
		undefined,
		{
			skip: Boolean(itemId),
			pollingInterval: 60000,
			refetchOnMountOrArgChange: true,
		}
	);

	const { data: itemData = [], isFetching: isFetchingDataById } = useGetHistoryDataByIdQuery(
		itemId ?? '',
		{
			skip: !itemId,
			pollingInterval: 60000,
			refetchOnMountOrArgChange: true,
		}
	);

	const data = itemId ? itemData : allData;
	const isFetching = isFetchingAllData || isFetchingDataById;

	return { data, isFetching };
};
