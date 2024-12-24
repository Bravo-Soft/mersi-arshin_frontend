import dayjs, { Dayjs } from 'dayjs';

import { transformTitle } from './transformTitle';

import { IRequestItem } from 'types/arshinIntegration';

export const setDefaultValue = (data?: IRequestItem | null) => {
	if (data) {
		const { id, name, period, range, sendEmail } = data;

		return {
			id,
			name: transformTitle(name),
			period,
			sendEmail,
			range: [dayjs(range[0]), dayjs(range[1])] as [Dayjs, Dayjs],
		};
	}
};
