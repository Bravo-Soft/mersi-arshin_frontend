import { useMemo } from 'react';

import {
	useGetGroupDataQuery,
	useGetRequestDataQuery,
	useGetUserArshinDataQuery,
} from '../arshinTableApiSlice';
import { selectFilterType, selectRequest } from '../arshinTableSlice';

import { useProcessArshin } from './useWorkingArshin';

import { ArshinStatus } from 'constant/arshinStatus';
import { useAppSelector } from 'hooks/redux';
import { ARSHIN_FILTER_TYPE } from 'types/arshinIntegration';

/**
 * @package хук фильтрации данных таблицы Аршин
 * @props null
 * @returns возвращает {isLoading  - массив отфильтрованных строк , data - данные по типу фильтра}
 */

export const useFilterArshin = () => {
	const isOpen = useProcessArshin();

	const filterType = useAppSelector(selectFilterType);
	const selectedRequest = useAppSelector(selectRequest);

	const { data: userData = [], isFetching: isUserDataLoading } = useGetUserArshinDataQuery(
		undefined,
		{
			refetchOnMountOrArgChange: true,
			pollingInterval: 30000,
			skip: !isOpen,
		}
	);

	const { data: groupData = [], isFetching: isGroupDataLoading } = useGetGroupDataQuery(
		undefined,
		{
			refetchOnMountOrArgChange: true,
			skip: !isOpen || filterType !== ARSHIN_FILTER_TYPE.ALL,
		}
	);

	const { data: requestDataItems = [], isFetching: isRequestsLoading } = useGetRequestDataQuery(
		selectedRequest?.id ?? '',
		{
			skip: !isOpen || !selectedRequest,
		}
	);
	const userDoneItems = useMemo(
		() => userData?.filter(({ status }) => status === ArshinStatus.DONE),
		[userData]
	);

	const data =
		filterType === ARSHIN_FILTER_TYPE.MY_ITEMS
			? userData
			: filterType === ARSHIN_FILTER_TYPE.ALL
			? groupData
			: filterType === ARSHIN_FILTER_TYPE.MY_COMPLETED
			? userDoneItems
			: filterType === ARSHIN_FILTER_TYPE.REQUEST_ITEMS
			? requestDataItems
			: [];

	const isLoading = isUserDataLoading || isGroupDataLoading || isRequestsLoading;

	return { isLoading, data };
};
