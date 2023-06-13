import { compareAsc, getMonth, parseISO } from 'date-fns';
import { useMemo } from 'react';

import { selectCurrentChipFilterVariant } from '../dataTableSlice';

import { selectUserId } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItem } from 'types/dataItem';
import { createDateISO } from 'utils/createDateISO';

const useChipFilter = (data: IDataItem[] = []) => {
	const currentChipFilterOption = useAppSelector(selectCurrentChipFilterVariant);
	const userId = useAppSelector(selectUserId);

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
				return data.filter(row => (userId ? row.userIds.includes(userId) : false));
			}

			default:
				return data.filter(
					row => getMonth(parseISO(row.dateOfTheNextVerification)) === currentChipFilterOption
				);
		}
	}, [currentChipFilterOption, data, userId]);
};

export default useChipFilter;
