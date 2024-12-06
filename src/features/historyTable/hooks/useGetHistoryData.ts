import dayjs from 'dayjs';

import { useGetAllHistoryDataQuery, useGetHistoryDataByIdQuery } from '../historyTableApiSlice';
import { selectSelectedId } from '../historyTableSlice';

import { useAppSelector } from 'hooks/redux';
import { IDataItem } from 'types/dataItem';
import { IHistoryItem } from 'types/historyItem';

export const useGetHistoryData = () => {
	const selectedItemId = useAppSelector(selectSelectedId);
	console.log(selectedItemId);

	const { data: allData = [], isFetching: isFetchingAllData } = useGetAllHistoryDataQuery(
		undefined,
		{
			skip: Boolean(selectedItemId),
			pollingInterval: 60000,
			refetchOnMountOrArgChange: true,
		}
	);

	const { data: itemData = [], isFetching: isFetchingDataById } = useGetHistoryDataByIdQuery(
		selectedItemId ?? '',
		{
			skip: !selectedItemId,
			pollingInterval: 60000,
			refetchOnMountOrArgChange: true,
		}
	);

	// const parseHistoryChanges = () => {
	// 	if (!Array.isArray(itemData) || itemData.length === 0 || !itemData) return [];

	// 	const copy = [...itemData];
	// 	const sortedHistory = copy.sort((a, b) => {
	// 		return dayjs(a.modificationDate).isSameOrAfter(dayjs(b.modificationDate)) ? 1 : -1;
	// 	});

	// 	return sortedHistory.map((current: IHistoryItem, index) => {
	// 		const previous = sortedHistory[index - 1] || {};

	// 		const { modificationDate, flags } = current;

	// 		const updates = Array.isArray(flags)
	// 			? flags.map((field: keyof IDataItem) => ({
	// 					field,
	// 					oldValue: previous[field] || 'Неизвестно',
	// 					newValue: current[field] || 'Неизвестно',
	// 			  }))
	// 			: {};

	// 		return {
	// 			modificationDate,
	// 			updates,
	// 		};
	// 	});
	// };

	const data = selectedItemId ? itemData : allData;
	const isFetching = isFetchingAllData || isFetchingDataById;

	return { data, isFetching };
};
