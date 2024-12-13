import { useMemo } from 'react';

import { selectFilterType, selectRequest } from '../arshinTableSlice';

import { ArshinStatus } from 'constant/arshinStatus';
import { selectUserId } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import { ARSHIN_FILTER_TYPE, IDataItemArshin } from 'types/arshinIntegration';

/**
 * @package хук фильтрации данных таблицы Аршин
 * @props data - строки таблицы Аршин
 * @returns возвращает filteredData - массив отфильтрованных строк
 */

export const useFilterArshin = (data: IDataItemArshin[] = []) => {
	const currentUserId = useAppSelector(selectUserId) as string;
	const filterType = useAppSelector(selectFilterType);
	const selectedRequest = useAppSelector(selectRequest);

	return useMemo(() => {
		switch (filterType) {
			case ARSHIN_FILTER_TYPE.MY_ITEMS: {
				const filteredData = data.filter(({ usersArshinId }) =>
					usersArshinId.includes(currentUserId)
				);
				return filteredData;
			}
			case ARSHIN_FILTER_TYPE.MY_COMPLETED: {
				const filteredData = data.filter(
					({ usersArshinId, status }) =>
						usersArshinId.includes(currentUserId) && status === ArshinStatus.DONE
				);
				return filteredData;
			}
			case ARSHIN_FILTER_TYPE.ALL:
				return data;

			case ARSHIN_FILTER_TYPE.REQUEST_ITEMS: {
				if (selectedRequest) {
					const { dataIds } = selectedRequest;
					return dataIds as IDataItemArshin[];
				}

				return [];
			}
			default:
				return [];
		}
	}, [currentUserId, filterType, selectedRequest, data]);
};
