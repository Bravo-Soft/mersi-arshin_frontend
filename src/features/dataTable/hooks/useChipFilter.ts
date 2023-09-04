import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useMemo } from 'react';

import { selectCurrentChipFilterVariant } from '../dataTableSlice';

import { selectUserId } from 'features/user/userSlice';
import { useAppSelector } from 'hooks/redux';
import type { IDataItem } from 'types/dataItem';

const useChipFilter = (data: IDataItem[] = []) => {
	dayjs.extend(duration);

	const currentChipFilterOption = useAppSelector(selectCurrentChipFilterVariant);
	const userId = useAppSelector(selectUserId);

	return useMemo(() => {
		dayjs.extend(isSameOrAfter);
		switch (currentChipFilterOption) {
			case 'Все':
				return data;

			case 'Просроченные':
				return data.filter(row =>
					Boolean(!dayjs().startOf('date').isBefore(row.dateOfTheNextVerification))
				);
			case 'Избранное': {
				return data.filter(row => (userId ? row.userIds.includes(userId) : false));
			}

			default:
				return data.filter(row => {
					const parsedDate = row.dateOfTheNextVerification;
					const currentMonth = dayjs(parsedDate).month() === currentChipFilterOption;

					const monthIsPast = dayjs(parsedDate).month() < dayjs().month();
					const nextYear = dayjs().add(1, 'year');

					if (!currentMonth) {
						return false;
					}

					if (monthIsPast) {
						return dayjs(parsedDate).isSameOrAfter(nextYear, 'year');
					} else {
						return dayjs().isSame(parsedDate, 'year');
					}
				});
		}
	}, [currentChipFilterOption, data, userId]);
};

export default useChipFilter;
