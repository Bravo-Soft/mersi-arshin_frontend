import { compareAsc, getMonth, parseISO } from 'date-fns';
import { useAppSelector } from 'hooks/redux';
import { useMemo } from 'react';
import { createDateISO } from 'utils/createDateISO';
import { selectCurrentChipFilterVariant } from '../dataTableSlice';
import { useGetAllFavoriteIdsQuery } from '../favoritesApiSlice';

import type { IDataItem } from 'types/dataItem';

const useChipFilter = (data: IDataItem[] = []) => {
	const currentChipFilterOption = useAppSelector(selectCurrentChipFilterVariant);

	const { data: favoriteList = [] } = useGetAllFavoriteIdsQuery();

	return useMemo(() => {
		const today = parseISO(createDateISO(new Date()));

		switch (currentChipFilterOption) {
			case 'Все':
				return data;

			case 'Просроченные':
				return data.filter(
					row => compareAsc(today, parseISO(row.dateOfTheNextVerification)) !== -1
				);

			case 'Избранное': {
				return data.filter(row => favoriteList.includes(row.id));
			}

			default:
				return data.filter(
					row => getMonth(parseISO(row.dateOfTheNextVerification)) === currentChipFilterOption
				);
		}
	}, [currentChipFilterOption, data, favoriteList]);
};

export default useChipFilter;
