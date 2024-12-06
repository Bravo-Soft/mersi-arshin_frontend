import dayjs, { type Dayjs } from 'dayjs';

import { IDataItem } from 'types/dataItem';
import { IHistoryItem } from 'types/historyItem';

export const parseHistoryChanges = (data: IHistoryItem[]) => {
	if (!Array.isArray(data) || data.length === 0 || !data) return [];

	const copy = [...data];
	const sortedHistory = copy.sort((a, b) => {
		return dayjs(a.modificationDate).isSameOrAfter(dayjs(b.modificationDate)) ? 1 : -1;
	});

	return sortedHistory.map((current, index) => {
		const previous = sortedHistory[index - 1] || {};

		const { modificationDate, flags, editedBy, action } = current;

		const datesArray = [
			'verificationDate',
			'productionDate',
			'dateOfTheNextVerification',
			'dateOfCommissioning',
		];

		const updates = Array.isArray(flags)
			? flags.map((field: keyof IDataItem) => {
					return {
						field,
						editedBy,
						oldValue: datesArray.includes(field)
							? dayjs(previous[field] as unknown as Dayjs).format('DD.MM.YYYY')
							: previous[field],
						newValue: datesArray.includes(field)
							? dayjs(current[field] as unknown as Dayjs).format('DD.MM.YYYY')
							: current[field] || 'Неизвестно',
					};
			  })
			: [];

		return {
			action,
			editedBy,
			modificationDate: dayjs(modificationDate).format('DD.MM.YYYY'),
			updates,
		};
	});
};
