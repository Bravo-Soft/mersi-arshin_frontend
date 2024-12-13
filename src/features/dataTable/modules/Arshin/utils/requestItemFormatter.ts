import dayjs from 'dayjs';

import { IRequestItem, IRequestItemWithDates } from 'types/arshinIntegration';
import { createDateISO } from 'utils/createDateISO';

export type CreateRequestItem = Omit<IRequestItemWithDates, 'id' | 'creator' | 'status'>;
export type UpdateRequestItem = Omit<IRequestItemWithDates, 'creator' | 'status' | 'dataIds'>;

export const requestItemFormatter = <T extends CreateRequestItem>(data: T) => {
	const { name, range, ...other } = data;

	const now = dayjs(new Date());

	return {
		...other,
		name: name.length ? name : `Запрос от ${createDateISO(now)}`,
		range: [createDateISO(range[0]), createDateISO(range[1])] as [string, string],
	};
};

export const updateRequestItemFormatter = (
	data: UpdateRequestItem
): Omit<IRequestItem, 'dataIds' | 'status' | 'creator'> => {
	const { range, ...other } = data;

	return {
		...other,
		range: [createDateISO(range[0]), createDateISO(range[1])] as [string, string],
	};
};
